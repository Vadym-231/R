import React, {createFactory} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Header from "./Header";
import * as serviceWorker from './serviceWorker';
import store_ from "./createFactory";
import RegistrationForm from './Autorization';
import { Switch, HashRouter,BrowserRouter,  Route,Router } from 'react-router-dom'
import NewsOrStatetesInformation from "./NewsOrStatetesInformation";
import ComponentViewer from "./ComponentView";
import RegForm from "./RegForm";
//mport Coments from "./Coments";
import SearcStr from "./SearcStr";
window.React=React;
/*function fa(props){
    return function () {
        return<App Fuctori={props}/>
    }
}
let info = fa(store_);*/
const errorFucn =()=>{
    return <div> ERROR a[a[a[[a 404</div>
};
const checkSession =()=>{
    //console.log(<document className="cookie"></document>);
    console.log(document.cookie)
    return  document.cookie
}

const render =()=> {
//
    ReactDOM.render(
        <HashRouter>
                <div>
                <Switch>
                    <Route path='/registration' exatc render={(props)=><RegForm store={store_} {...props}/>}/>
                    <Route path='/serchInfo=:searchStr' exact render={(props)=><SearcStr store={store_} {...props}/>}/>
                    <Route path='/autorization'  exact render={(props)=><RegistrationForm checkSesin={checkSession} store={store_}{...props}/>}/>
                    <Route  path='/' exact render={(props)=><App Fuctori={store_} {...props}/>}/>
                    <Route  path="/id=:idF" exact render={(props)=><App Fuctori={store_} {...props}/>}/>
                    <Route  path="/news" exact render={(props)=><NewsOrStatetesInformation store={store_} type="newsBlocks" {...props}/>}/>
                    <Route  path="/states" exact render={(props)=><NewsOrStatetesInformation store={store_} type="statesBlock" {...props}/>}/>
                    <Route  path="/lastStatesId=:id_" exact render={(props)=><ComponentViewer store={store_} type="STATES" {...props}/>}/>
                    <Route  path="/lastNewsId=:id_" exact render={(props)=><ComponentViewer store={store_} type="NEWS" {...props}/>}/>
                    <Route component= {errorFucn}/>
            </Switch>
              </div>
        </HashRouter>,
        document.getElementById('root')
    );
};
store_.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
