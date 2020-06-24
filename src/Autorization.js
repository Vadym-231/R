import React from "react";
import Header from "./Header";


class RegistrationForm extends React.Component{
    constructor(props) {
        super(props);
        fetch('name').then(data=>{
            if(data.ok){
                return data.json();
            }

        }).then(data=>{
            if(data.code===200){
                window.location.href="/#/"
            }
        })
        fetch("headerInfo").then(
            data=>{
                if(data.ok){
                    return data.json()
                }
            }
        ).then(data=>{this.props.store.dispatch({type:"ADD_MAIN_STATE",numb:data.numb,mainNew_:data.mainNews})})

        this.state = {valuePass: '',valueLogin:'',info:this.props.checkSesin()};

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePass(event){
        this.setState({valuePass: event.target.value})
    }
    handleChangeLogin(event) {
        this.setState({valueLogin: event.target.value});
    }

    handleSubmit(event) {
        //alert('Pass: ' + this.state.valuePass+' Log:'+this.state.valueLogin);
        event.preventDefault();
        fetch('register',{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(this.state)
        }).then(res=>{if(res.ok)
        {
            //let a = res.text()
            console.log( res)
        }}).catch(err=>console.log(err))


    }


    goFetch(){
        fetch('checkSesion').then(data=>{
            if(data.ok){
                return data.text()
            }
        }).then(data=>console.log(data))
    }
    render() {
        return(
            <div>
                <Header stateNavigate={this.props.store.getState().Headers.mainNew} str={this.props.match.path} store={this.props.store}/>

                <form className='registationCess' onSubmit={this.handleSubmit}>
                    <label> Логін <br/>
                    <input type='text' value={this.state.valueLogin} onChange={this.handleChangeLogin}/>
                   <br/>
                    </label>
                    <label> Пароль<br/>
                    <input type='password' value={this.state.valuePass} onChange={this.handleChangePass}/>

                </label>
                    <br/>
                    <input type='submit' value='Вхід'/>
                    <input type='button' value='Реєстрація' onClick={()=>window.location.href='#/registration'}/>
                </form>

            </div>

        )
    }
}
export  default  RegistrationForm