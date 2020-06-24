import React from "react";
import PropTypes, {func, number} from 'prop-types';
import {Link} from "react-router-dom";

export default class components extends React.Component{


    constructor(props) {

        super(props);


    }


    render() {
        const {imgSrc,Header,content,id}=this.props
        const RenderingComp=({img,title,id,className_=''})=>{


                if(img!=null){
                    return <Link to={"/lastNewsId="+id}  onMouseOver={ (e)=>{
                        const el = e.target;
                        el.style.opacity=0.7;
                    }}  onMouseOut={(e)=>{
                        const el = e.target;
                        el.style.opacity=1;
                    }} className={(this.props.className_!=='')?this.props.className_:"mainBlock "}><figure className={"mainBlock1 "}>
                        <img src={img} className="imgMainBlock"/>

                        <figcaption>{title}</figcaption>
                    </figure></Link>
                }
                else {
                    return <Link to={"/lastNewsId="+id}><p className={"mainBlock1 "+className_}>{title}</p></Link>
                }

        };
        return<div><RenderingComp className_={this.props.className_} img={imgSrc} title={Header} id={id} />

         </div>

    }

}
