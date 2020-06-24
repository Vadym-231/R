import React from "react";
import PropTypes, {func, number} from 'prop-types';
class GetMore extends  React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const getMax=(type)=>{
            let buf = this.props.store.getState().MainData.dataMainNews[0].id;
            if(type==='MIN'){
                this.props.store.getState().MainData.dataMainNews.map(data=>{if(data.id<buf){
                    buf =data.id;

                }})
            }
            else {
                this.props.store.getState().MainData.dataMainNews.map(data=>{if(data.id>buf){
                    buf =data.id;

                }})
            }
            return buf;
        }
        const getMoreInfoClick=()=>{

            let buf = getMax('MIN');

            fetch('getNewInfoId='+buf).then(data=>{
                if(data.ok){
                    console.log(buf);
                    return data.json()
                }
            }).then(data=>{
                this.props.store.dispatch({type:"ADD_MORE_INFORMATION_TO_LIST_NEWS",arr:data})

            })


        }
        const getMoreInfoClickStates=()=>{
            let bu = this.props.store.getState().MainData.dataMainStates[0].id;
            this.props.store.getState().MainData.dataMainStates.map(data=>{if(data.id<bu){
                bu =data.id;

            }})

            fetch('getStaInfoId='+bu).then(data=>{
                if(data.ok){
                    console.log(bu);
                    return data.json()
                }
            }).then(data=>{
                this.props.store.dispatch({type:"ADD_MORE_INFORMATION_TO_LIST_STATES",arr:data})

            })
        }
        const GetMoreInfoStates = ({bool})=>{

            return (bool)?<p className="GetMore" onMouseOver={ (e)=>{
                const el = e.target;
                el.style.opacity=.8;
            }} onMouseOut={e=>{
                const el = e.target;
                el.style.opacity=.5;
            }} onClick={()=>getMoreInfoClickStates()}>&darr;</p>:<p></p>
        }
        const GetMoreInfo =({bool})=>{
        //    console.log(this.props.store.getState().MainData.dataMainNews.length+" "+this.props.store.getState().Headers.numberNews);
            return (bool)?<p className="GetMore" onMouseOver={ (e)=>{
                const el = e.target;
                el.style.opacity=.8;
            }} onMouseOut={e=>{
                const el = e.target;
                el.style.opacity=.5;
            }} onClick={()=>getMoreInfoClick()}>&darr;</p>:<p></p>
        }

        if(this.props.type==='newsBlocks'){
            console.log((this.props.store.getState().Headers.numberNews>this.props.store.getState().MainData.dataMainNews.length));
            return<div><GetMoreInfo bool={(this.props.store.getState().Headers.numberNews>this.props.store.getState().MainData.dataMainNews.length)}/></div>

        }
        else {
            console.log(this.props.store.getState().Headers.numberStates)
            console.log(this.props.store.getState().MainData.dataMainStates.length)
            console.log(this.props.store.getState().Headers.numberStates>this.props.store.getState().MainData.dataMainStates.length)
            return <div><GetMoreInfoStates bool={(this.props.store.getState().Headers.numberStates>this.props.store.getState().MainData.dataMainStates.length)} /></div>
        }

    }
}
export default GetMore;