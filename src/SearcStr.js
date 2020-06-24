import React from "react";
import Header from "./Header";
import {Link} from "react-router-dom";

class SearcStr extends  React.Component{


    constructor(props) {
        super(props);
        fetch("headerInfo").then(
            data=>{
                if(data.ok){
                    return data.json()
                }
            }
        ).then(data=>{this.props.store.dispatch({type:"ADD_MAIN_STATE",numb:data.numb,mainNew_:data.mainNews})
            }
        )
        let text =this.props.match.params.searchStr;
        /*if(/^[А-Я-а-яі\s]+$/.test(text)&&text.length>3){
            fetch(encodeURI("giveMeInfoStr="+text)).then(data=>{
               // this.props.store.dispatch({type:"EXEC"})
                if(data.ok){
                    return data.json()
                }
            }).then(data=>{
                this.props.store.dispatch({type:"SEARCH_BLOCK_SET",arr:data})
            })
        }*/
    }
    render() {
       const {searchStr}=this.props.match.params;
       const{store} = this.props.store;
       const RenaderingNews =({arr})=>{
           return(
               <Link to={"/lastNewsId="+arr.id}>
               <figcaption>
                   <img src={arr.img_src}/>
                   <figcaption>
                       {arr.Content}
                   </figcaption>
               </figcaption>
               </Link>
           )
       }
       const RenderingStates=({arr})=>{
           return(
               <Link to={"/lastStatesId="+arr.id}>
                   <p>{arr.tatel}</p>
               </Link>
           )
       }
       const Rendering=({arr})=>{
           return (
               <div>
               {(arr.type==='NEWS')?<RenaderingNews arr={arr}/>:<RenderingStates arr={arr}/> }
               </div>
           )
       }
       const RenderAllInfo=()=>{
           return(
               <div>
                   {(this.props.store.getState().Buffer.length>0)?this.props.store.getState().Buffer.map(data=><Rendering arr={data}/>):<div>DONT FOUND INFO {this.props.match.params.searchStr}</div>}
               </div>
           )
       }
        return <div>
            <Header stateNavigate={this.props.store.getState().Headers.mainNew} str={this.props.match.path} store={this.props.store}/>
            {(!this.props.store.getState().Loading)?<RenderAllInfo/>:<div>Loading...</div>}

        </div>;
    }

}
export default SearcStr;