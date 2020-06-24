import React from "react";
import {Link, NavLink} from "react-router-dom";

class Header extends React.Component {

    constructor(props) {
        super(props);
        fetch('name').then(data=>{
            if(data.ok){
                return data.json();
            }

        }).then(data=>{
            if(data.code===200){

                this.props.store.dispatch({type:'CHECK_USER',name:data.userName})
              //  console.log('its'+this.props.store.getState().user +'but its'+data.userName)
            }
        })
        fetch('maxStates').then(data=>{
            if(data.ok){
                return data.text()
            }
        }).then(data=>{
            this.props.store.dispatch({type:'UPDATE_STATE_NUMBER',numb_:data.valueOf()})
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

        this.searchInfo=this.searchInfo.bind(this);
    }

    searchInfo(){

        let  searchStr =this.refs.searchThis.value;
        if(searchStr!=null&&searchStr.length>3){
            window.location.href="/#/serchInfo="+searchStr;
            this.props.store.dispatch({type:"EXEC"});
            if(/^[А-Я-а-яі\s]+$/.test(searchStr)&&searchStr.length>3){
                fetch(encodeURI("giveMeInfoStr="+searchStr)).then(data=>{
                    // this.props.store.dispatch({type:"EXEC"})
                    if(data.ok){
                        return data.json()
                    }
                }).then(data=>{
                    this.props.store.dispatch({type:"SEARCH_BLOCK_SET",arr:data})
                })
            }
        }else {
            alert("Будь ласка заповніть поле");
        }
        /*
        console.log(this.props.str)
         */

    }
    render() {

        if(this.props.store.getState().Headers.mainNew===''||this.props.store.getState().Headers.mainNewID===0||this.props.store.getState().Headers.numberNews===0){
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
        }
        const MyPersonalOffise = ({name})=>{
            return (
                <div >
                    <p className='logined'>{name}<br/></p>
                     <p className='logined'>Мій кабінет</p>
                </div>
            )
        }
        const Check =()=>{
            if (!(this.props.store.getState().user==='')){
                return<Link  to="dfs" className="CaseLog"><MyPersonalOffise name={this.props.store.getState().user}/> </Link>
        }
            else{
               return<p className="CaseLog"><Link to="registation"  >Regist</Link><Link  to="sdf">Autorize</Link></p>
           }

        }
        return (
         <header>
            <div id="siteNavigate" >{(this.props.str==='/')?"Головна":(this.props.str==='/news')?"Головна/Новини":
            (this.props.str==='/states')?"Головна/Статті":(this.props.str==='/lastStatesId=:id_')?"Головна/Перегляд статті":
                (this.props.str==='/lastNewsId=:id_')?'Домівка/Перегляд новини':''}

                <Check/>
            </div>
            <div id="headerBar">
                <Link to="/" className='logoGo'><img src="logoL" /></Link>
                <div id="menuPanel">
                </div>
                <div id="lastImpotentNews"><span>Тема дня:</span><Link to={"lastNewsId="+this.props.store.getState().Headers.mainNewID}>{this.props.store.getState().Headers.mainNew}</Link></div>
                <input id="searchInfo" type="text" ref="searchThis" /><p id="doThis"  onClick={()=>this.searchInfo()}>&#128270;</p>
            </div>


        </header>
        );
    }
}

/*
export default function Header({stateNavigate}){
    const searchInfo=()=>{

    }
    return <header>
        <div id="siteNavigate" >sdfsd

            <a href="ds">Regist</a>
            <a href="sdf">Autorize</a>

        </div>
        <div id="headerBar">
            <img src="logoL" />
            <div id="menuPanel">
            </div>
            <div id="lastImpotentNews">Тема дня:{stateNavigate}</div>
            <input id="searchInfo" type="text" ref="searchThis" /><p id="doThis"  onClick={()=>searchInfo()}>&#128270;</p>
        </div>


    </header>
}*/
export default Header;

