import React from "react";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";


class LastStates extends React.Component{
    constructor(props) {
        super(props);
        fetch('takeLastState').then(data=>{
            if(data.ok){
                return data.json()
            }
        }).then(data=>{this.props.Fuctori.dispatch({type:"SET_LAST_BLOCKS_STATES",arr:data})
        })
    }
    render() {

        const RenderingComp=({title,id})=>{


                return <Link to={"lastStatesId="+id}><p className="mainBlockStates1">{title}</p></Link>


        };
        return(

            <div>
                {(!!this.props.className_1)?'':<span id="StatesText">Статті:</span>}
                <div className={(!!this.props.className_1)?this.props.className_1:"blockStates"}>

                    {this.props.arrayLastStates.map((data,i)=> <RenderingComp  title={data.tatel}  id ={data.id}/>
                    )}
                    <Link to="/states"><p >Дізнатися більше-></p></Link>
                </div>


            </div>


        )
    }


}
LastStates.PropTypes={
    arrayLastStates:PropTypes.array
}
export default LastStates;
