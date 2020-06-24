import React from "react";
import Header from "./Header";

export default  class RegForm extends React.Component{
    constructor() {
        super();
        this.passRef = React.createRef();
        this.checkPass = React.createRef()
        this.nameRef = React.createRef()
        this.familyRef = React.createRef()
        this.mailRef = React.createRef()
        this.submitForm= this.submitForm.bind(this);
        fetch("headerInfo").then(
            data=>{
                if(data.ok){
                    return data.json()
                }
            }
        ).then(data=>{this.props.store.dispatch({type:"ADD_MAIN_STATE",numb:data.numb,mainNew_:data.mainNews})})

    }

    submitForm(event){
        event.preventDefault();
        if(this.checkPass.current.value!==null&&this.passRef.current.value!==null&&this.mailRef.current.value!==null&&
            this.familyRef.current.value!==null&&this.nameRef.current.value!==null){
            if(this.checkPass.current.value.length>=5&&this.passRef.current.value.length>=5&&this.mailRef.current.value.length>=5&&
                this.familyRef.current.value.length>=5&&this.nameRef.current.value.length>=5){
                if(this.checkPass.current.value===this.passRef.current.value){
                    alert('all good')
                    fetch('autorized',{
                        method:'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify({name:this.nameRef.current.value,family:this.familyRef.current.value,pass:this.passRef.current.value,login:this.mailRef.current.value})
                    }).then(res=>{if(res.ok)
                    {
                        //let a = res.text()
                        console.log( res)
                    }}).catch(err=>console.log(err))

                }
            }
        }
    }


    render() {
        return(
            <div>
            <Header stateNavigate={this.props.store.getState().Headers.mainNew} str={this.props.match.path} store={this.props.store}/>
            <form onSubmit={this.submitForm}>
                <label >
                    Імя:<br/>
                    <input type="text" ref={this.nameRef}/>
                </label>
                <br/>
                <label>
                    Прізвище:
                    <br/>
                    <input type="text" ref={this.familyRef}/>
                </label>
                <br/>
                <label>
                    Пошта:
                    <br/>
                    <input type="text" ref={this.mailRef}/>
                </label>
                <br/>
                <label>
                    Пароль:
                    <br/>
                    <input type="password" ref={this.passRef}/>
                </label>
                <label>
                    Повторити пароль:
                    <br/>
                    <input type="password" ref={this.checkPass}/>
                </label>
                <input type='submit' value='Зареєструватися'/>
                <input type='button' value='Вхід'/>
            </form>
            </div>
        )
    }
}
