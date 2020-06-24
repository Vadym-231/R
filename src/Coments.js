import ComponentBlock from "./ComponentBlock";
import {Link} from "react-router-dom";
import React from "react";

export default class Coments  extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props)
            //this.fetchData();
        this.buf=this.props.match.params.id_;

        this.state = {valueComent: '',id:0,type:''};
        this.comentRef= React.createRef();
        //this.setComm= this.setComm.bind(this);
        this.submit=this.submit.bind(this);
    }
    fetchData() {
        this.buf = this.props.match.params.id_;
        let a = this.props.match.params.id_
        if (a !== null && Number(a) && Number(a) !== 0) {


        }
        if (this.props.type === "STATES") {
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

        }
    }

    submit(evt){
        evt.preventDefault();
        this.state.id=Number(this.props.match.params.id_)
        this.state.type=this.props.type;
        this.state.valueComent=this.comentRef.current.value;
        console.log(this.state.valueComent)
        fetch('commenting',{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(this.state)
        }).then(data=>{
            if(data.ok){
                return data.json()
            }
        {
            //let a = res.text()

        }}).then(data=>{
           // alert(data)
            console.log( data.code)
            if(data.code===200){
                this.fetchData()
            }else {
                alert('ERROR')
            }

        }).catch(err=>alert('ERROR'))
    }
    setComm(evt){
        this.setState({valueComent: evt.target.value});
    }
    render() {
      /*  if(this.buf!==this.props.match.params.id_){
            this.fetchData()
           // this.props.store.dispatch({type:'GET_COMENTS'})
            this.buf=this.props.match.params.id_;
        }*/
        const RenderOne=({user,coment})=>{
        return(
            <div >
                <Link to='dsf' style={style}>{user} :</Link><p style={style}>{coment}</p>
            </div>
        )
    }
    const style={
        display: 'inline'
    }
    const NonComentMassege=()=>{
            return <div className={this.props.case}>Будьте першим хто залишить коментар</div>
    }
    const FormForConennting=()=>{
            if(this.props.store.getState().user!==''){
                return<form onSubmit={this.submit}>
                    <input type='text'  ref={this.comentRef}/>
                    <input type='submit' value='Прокоментувати' />
                </form>
            }else {
                return<p></p>
            }
    }
        const RenderComents=()=>{
            return(

                <div className={this.props.case}>

                    {this.props.store.getState().MainData.coment.map(data=><RenderOne user={data.UserName} coment={data.Coment}/> )}
                </div>
            )
        }
        if(this.props.type!==null){
            return <div><FormForConennting/>{(this.props.store.getState().MainData.coment.length!==0)?<RenderComents />:<NonComentMassege/>}</div>
        }
        else {
            return<div>error</div>
        }
    }
}