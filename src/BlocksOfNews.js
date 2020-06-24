import React from "react";
import PropTypes from 'prop-types'
import ComponentBlock from "./ComponentBlock";
import {Link} from "react-router-dom";
class FinalBlock extends React.Component{
    constructor(props) {
        super(props);


    }
    componentDidMount() {
        fetch('lastNews').then(
            data=>{
                if(data.ok){
                    return data.json()
                }
            }
        ).then(data=>{
            this.props.store.dispatch({type:"SET_LAST_BLOCKS_NEWS",arr:data})
            console.log(this.props.store.getState().Headers.dataNews);
        })
    }
    render() {
       //const {array_}=this.props


        return(


            <div className={(!!this.props.className_1)?"blockNews "+this.props.className_1:"blockNews"}>
                {this.props.store.getState().Headers.dataNews.map((data,i)=> <ComponentBlock className_={(!!this.props.className_2)?this.props.className_2:''} imgSrc={data.img_src} Header={data.Header} content ={data.Content} id ={data.id}/>
                )

                }


                <Link to="/news"><p className={(!!this.props.className_2)?'mainBlock2':'mainBlock2'} >Дізнатися більше-></p></Link>

            </div>


        )
    }


}
FinalBlock.PropTypes={
    arrayLastNews:PropTypes.array
}
export default FinalBlock;
