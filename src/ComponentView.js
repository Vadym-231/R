import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";
import store_ from "./createFactory";
import FinalBlock from "./BlocksOfNews";
import LastStates from "./StatesLast";
import Coments from "./Coments";
class  ComponentViewer extends  React.Component{
    constructor(props) {
        super(props);

      //  this.fetchData();
        this.buf=this.props.match.params.id_;
    }
    fetchData(){
        fetch('takeLastState').then(data=>{
            if(data.ok){
                return data.json()
            }
        }).then(data=>{this.props.store.dispatch({type:"SET_LAST_BLOCKS_STATES",arr:data})
            })

        fetch("headerInfo").then(
            data=>{
                if(data.ok){
                    return data.json()
                }
            }
        ).then(data=>{
                console.log(data)
                this.props.store.dispatch({type:"ADD_MAIN_STATE",numb:data.numb,mainNew_:data.mainNews,id_:data.id_})
            }
        )
        let a =this.props.match.params.id_
        if(a!==null&&Number(a)&&Number(a)!==0) {


            if (this.props.type === "STATES") {
//<Route path='/ConmentId=:id_' exact render={(props)=>}/>

                fetch('giveMeInfoStatId=' + this.props.match.params.id_).then(data => {
                    if (data.ok) {
                        return data.json()
                    }
                }).then(data => {
                    this.props.store.dispatch({type: "NOW_BLOCK_SET", data_: data})
                })
                fetch('getComentsForStatesId=' + Number(a)).then(data => {
                    if (data.ok) {
                        return data.json()
                    }
                }).then(data => {
                    if (data.length !== 0) {
                        this.props.store.dispatch({type: 'GET_COMENTS', coments: data})
                    }

                    // console.log(this.props.store.getState().MainData.coment[0].UserName)
                    // console.log(data)
                })
            } else {
                fetch('getComentsForNewsId=' + Number(a)).then(data => {
                    if (data.ok) {
                        return data.json()
                    }
                }).then(data => {
                    if (data.length !== 0) {
                        this.props.store.dispatch({type: 'GET_COMENTS', coments: data})
                    }
                })
                fetch('giveMeInfoNewsId=' + this.props.match.params.id_).then(data => {

                    if (data.ok) {
                        return data.json()
                    }
                }).then(data => {
                    this.props.store.dispatch({type: "NOW_BLOCK_SET", data_: data})
                })

            }
        }
    }
componentDidMount() {
      this.fetchData();
}

    render() {

        if(this.buf!=this.props.match.params.id_){
            this.fetchData()
            this.props.store.dispatch({type:'CLEAR_BUFF'})
            this.buf=this.props.match.params.id_;
        }
 const RenderingStates_=({arr})=>{
            return <div className="mainStatesBlockAll">
                <p>{arr.tatel}</p>
                <p>{arr.content}</p>
                <p className='ComentBlock'>Коментарі({this.props.store.getState().MainData.coment.length}):<Coments store={this.props.store} case='comentTest' type={this.props.type} {...this.props}/></p>
            </div>
        }
        const RenderingStates=()=>{

            return <RenderingStates_ arr={this.props.store.getState().MainData.nowBlock}/>
        }
        const FetchBlock=({id,arrTest})=> {
//<Coments store={store_} case='comentTest' type="NEWS"/>
 if (arrTest.img_src != null) {
                    return (<figure className="viewBlock">
                        <img src={arrTest.img_src} className="imgMainBlock"/>
                        <figcaption>{arrTest.Header}</figcaption>
                        <figcaption>{arrTest.Content}</figcaption>
                        <br/>
                            <figcaption className='ComentBlock' > Коментарі({this.props.store.getState().MainData.coment.length}): <Coments store={this.props.store} case='comentTest' type={this.props.type} {...this.props}/>
                            </figcaption>
                    </figure>)
                } else {
                    return <div><p className="mainBlock">{arrTest.Header}</p></div>
                }

        }
        const RenderingComp=({id})=>{

            return <FetchBlock id={id} arrTest={this.props.store.getState().MainData.nowBlock}/>
        }
        const RenderBlockOfNews=()=>{
            return <RenderingComp id={this.props.match.params.id_}/>
        }

        if(this.props.type==='STATES'){
            if(Number(this.props.match.params.id_)&&this.props.match.params.id_<=Number(this.props.store.getState().Headers.numberNews)){


                return  <div>
                    <Header stateNavigate={this.props.store.getState().Headers.mainNew} str={this.props.match.path} store={this.props.store}/>
                    <RenderingStates/>
                    <Link to="/" className="GoBack" onMouseOver={ (e)=>{
                        const el = e.target;
                        el.style.opacity=.8;
                    }} onMouseOut={e=>{
                        const el = e.target;
                        el.style.opacity=.5;
                    }}>&#8592;</Link>
                    <LastStates className_1="lol_kek" arrayLastStates={this.props.store.getState().Headers.dataStates}/>
                    <FinalBlock className_1="blockViewNewsWithout" className_2="classVarianII" store={this.props.store}/>

                </div>
            }
            else {
                return <div>ERROR 404</div>
            }
        }
        else {
            if(Number(this.props.match.params.id_)&&this.props.match.params.id_<=Number(this.props.store.getState().Headers.numberNews)){

                return <div>
                    <Header stateNavigate={this.props.store.getState().Headers.mainNew} str={this.props.match.path} store={this.props.store}/>
                    <Link to="/" className="GoBack" onMouseOver={ (e)=>{
                    const el = e.target;
                    el.style.opacity=.8;
                }} onMouseOut={e=>{
                    const el = e.target;
                    el.style.opacity=.5;
                    }}>&#8592;</Link>

                    <div><RenderBlockOfNews/>

                </div>
                    <LastStates className_1="lol_kek" arrayLastStates={this.props.store.getState().Headers.dataStates}/>
                    <FinalBlock className_1="blockViewNewsWithout" className_2="classVarianII" store={this.props.store}/>


                </div>
            }
            else {
                return <div>ERROR 404</div>
            }
        }

    }

}
export  default ComponentViewer;