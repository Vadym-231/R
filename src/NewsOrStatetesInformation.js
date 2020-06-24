import React from "react";
import PropTypes, {func, number} from 'prop-types';
import Header from "./Header";
import GetMore from "./GetMore";
import {Link} from "react-router-dom";
import store_ from "./createFactory";
export default class components extends React.Component{


    constructor(props) {

        super(props);
        fetch("headerInfo").then(
            data=>{
                if(data.ok){
                    return data.json()
                }
            }
        ).then(data=>{this.props.store.dispatch({type:"ADD_MAIN_STATE",numb:data.numb,mainNew_:data.mainNews})})
        if(this.props.type==='newsBlocks') {
         this.fetchFunction({type:"SET_MAIN_LIST_NEWS"})
       }
        if(this.props.type==='statesBlock'){
           this.fetchFunction({type:"SET_MAIN_LIST_STATES"})
        }
    }

    fetchFunction({type}){
        fetch(type).then(
            data=>{
                if(data.ok){
                    return data.json()
                }
            }
        ).then(data=>{this.props.store.dispatch({type:type,arr:data});console.log(data)})
    }



    render() {

        const Anything=()=>{
            if(this.props.type==='newsBlocks') {
                return (

                    <RenderData type="news"/>
                )
            }
            if(this.props.type==='statesBlock'){
                return (
                    <RenderData type="states"/>
                )
            }
            else{
                return <div>ERROR 404</div>
            }
        }
      const RenderingComp=({img,title,id})=>{

            if(img!=null){
                return <Link to={"lastNewsId="+id} onMouseOver={ (e)=>{
                    const el = e.target;
                    el.style.opacity=0.7;
                }}  onMouseOut={(e)=>{
                    const el = e.target;
                    el.style.opacity=1;
                }} className="mainBlock mainBlockNewsAll"><figure className="mainBlock1 ">
                    <img src={img} className="imgMainBlock imgMainBlock"/>

                    <figcaption>{title}</figcaption>
                </figure></Link>
            }
            else {
                return <Link to={"lastNewsId="+id}  nMouseOver={ (e)=>{
                    const el = e.target;
                    el.style.opacity=0.7;
                }}  onMouseOut={(e)=>{
                    const el = e.target;
                    el.style.opacity=1;
                }}><p  className="mainBlock1 newsWithOutImg">{title}</p></Link>
            }

        };
        const RenderNewsBlock=({array_})=>{

            return<div>{ array_.map(function(data){

                return <RenderingComp title={data.Header} img={data.img_src} id={data.id} />})}</div>
        }
        const RenderingCompStates=({title,id,content})=>{

//(content.length>100)?content.substr(0,100):content
            return <Link className="mainStatesBlockAll" to={"lastStatesId="+id} onMouseOver={ (e)=>{
                const el = e.target;
                el.style.opacity=0.7;
            }}  onMouseOut={(e)=>{
                const el = e.target;
                el.style.opacity=1;
            }} ><p className="mainBlockStates_">{title}</p>
                <p className="mainBlockStatesContent">{(content.length>100)?content.substr(0,50)+"...":content}</p>
            </Link>


        };
        const RenderStatesBlock=({array_})=>{
            return <div>{array_.map(data=> <RenderingCompStates  title={data.tatel}  id ={data.id} content={data.content}/>
                )}</div>
        }
        const RenderData=({type})=>{
            if(type==='news'){
                return<div><RenderNewsBlock array_={this.props.store.getState().MainData.dataMainNews}/></div>
            }
            else {
                return <div><RenderStatesBlock array_={this.props.store.getState().MainData.dataMainStates}/></div>
            }


        }

        return(
            <div>
                <Header stateNavigate={this.props.store.getState().Headers.mainNew} str={this.props.match.path} store={this.props.store}/>
                <Anything/>


                <GetMore store={this.props.store} type={this.props.type} />


            </div>
        )

    }

}