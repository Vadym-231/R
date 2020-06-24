import React, {createRef} from 'react';
import PropTypes, {func} from 'prop-types';
import stateA from "./state";
import Header from "./Header";
import ComponentBlock from "./ComponentBlock";
import FinalBlock from "./BlocksOfNews";
import './App.css';
import LastStates from "./StatesLast";
import store_ from "./createFactory";

class App extends  React.Component{
    constructor(props) {
        super(props);
        let buff;
        fetch("headerInfo").then(
            data=>{
                if(data.ok){
                    return data.json()
                }
            }
        ).then(data=>{this.props.Fuctori.dispatch({type:"ADD_MAIN_STATE",numb:data.numb,mainNew_:data.mainNews})
        }
        )
        fetch('takeLastState').then(data=>{
            if(data.ok){
                return data.json()
            }
        }).then(data=>{this.props.Fuctori.dispatch({type:"SET_LAST_BLOCKS_STATES",arr:data})
        })

        /*fetch('lastNews').then(
            data=>{
                if(data.ok){
                    return data.json()
                }
            }
        ).then(data=>{
            this.props.Fuctori.dispatch({type:"SET_LAST_BLOCKS_NEWS",arr:data})
            console.log(this.props.Fuctori.getState().Headers.dataNews[0]);
        })*/

    }
    render(){
        return (
            <div>
                <Header stateNavigate={this.props.Fuctori.getState().Headers.mainNew} str={this.props.match.path} store={this.props.Fuctori}/>
                {console.log(this.props.match)}

                <LastStates arrayLastStates={this.props.Fuctori.getState().Headers.dataStates}/>
                <FinalBlock store={this.props.Fuctori}/>



            </div>

        )
    }
}
/*<p>{(this.props.match.params.idF)?this.props.match.params.idF:"null"}
                 </p>
class Ap23p extends React.Component {
    constructor(props) {
        super(props);
        console.log("sdfsdfsdfsdf");
        props.Fuctori.dispatch({type:"ADD_STATE",myClass:'star'})
        this.goReturn= this.goReturn.bind(this);
    }
    goReturn(){
        this.props.Fuctori.dispatch({type:"REPLAY_FIRST"})
    }



        render(){

           const  Gdfg=()=>{

                this.props.Fuctori.subscribe(Gdfg);
                return <div className={this.props.Fuctori.getState()[0]}></div>
            };
        return <div> <Gdfg/>
        <button onClick={this.goReturn}/>
        </div>

    }




}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowBuilding:{
                block_:<FinalBlock/>
            },
            Components:[{
            imgId: null,
            loading: false,
            title: 'er',
            id:1
            }
            ]
        };
        this.onGo= this.onGo.bind(this);
    }
    onGo(){

        this.setState((state=this.state,props)=>state.Components[0].title='dsfsdfsdf');
        console.log(this.state.Components[0].title);
    }

    render() {


        const {imgid,loading,title,id}= this.state.Components[0];

        return <div>
            <Header/>


            <ComponentBlock _imgId={imgid} _loading={loading} _title={title} id={id}/>

            {(window.location===' ')? this.state.nowBuilding.block_:this.state.nowBuilding.block_}

        </div>
    }
}

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            pop:stateA.info.lol
        }

        this.setInfo= this.setInfo.bind(this);


    }
    setInfo(text,state1){
        console.log(state1+"  "+text)
        this.setState({pop:state1+text})
    }
    inp = React.createRef();
    render() {
      //  const {inp} = this.refs;
        const {pop} = this.state;
        return <div><p>{pop}</p>
            <input type="text" ref={this.inp}/>
        <button onClick={()=>this.setInfo(this.inp.current.value,pop)} />
        </div>

    }
}

{    colors: [        {            "id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",            "title": "ocean at dusk",            "color": "#00c4e2",            "rating": 5        },        {            "id": "83c7ba2f-7392-4d7d-9e23-35adbe186046",            "title": "lawn",            "color": "#26ac56",            "rating": 3        },        {            "id": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",            "title": "bright red",            "color": "#ff0000",            "rating": 0        }    ] }

class Apsap extends React.Component {
    constructor(props) {
        super(props)

        this.state={

            starsSelected1:0,
            starsSelected2:0,
            starsSelected3:0,
            starsSelected4:0,
            starsSelected5:0
        };
        this.arr=[];
        for(let l =0;l<5;l++){
            this.arr.push({i:l,selected:false});
        }
        this.onClick_ = this.onClick_.bind(this);
    }

    onClick_=(i,id)=>{

        this.setState({starsSelected1:i});
    };
    render() {
       const Star = ({selected=false,onClick=k=>k})=><div className={(selected)?'star selected':'star'}  onClick={onClick}></div>

        const StarsRendering=({onClick_,id})=>{return <div>{[...Array(5)].map(  (n,i) =>
            <Star selected={ i===starsSelected1}  key={i} onClick={()=>onClick_(i+1,id)}/>
        )}<br/></div>}
        const {starsSelected1,starsSelected2,starsSelected3,starsSelected4,starsSelected5}= this.state;
        console.log(starsSelected1);
        return (            <div className="star-rating">
            {[...Array(5)].map(  (n,i) =>
                <StarsRendering key={i} id={i} />

            )}
        </div>
        )
    }
}


class Aspp extends React.Component{
   constructor(props) {
       super(props);
        this.arr=[];
       for(let l =0;l<5;l++){
           this.arr.push({i:l,selected:false});
       }

       this.onGo=this.onGo.bind(this);



   }


   //    this.arr.map(a=>console.log(a));

      onGo=(l)=>{
       this.setState(l);

        for(let i=0;i<this.arr.length;i++){
            if(this.arr[i].i===l){
                this.arr[i].selected=!this.arr[i].selected;
            }
        }
    };


    render() {

        const Star = ({ selcted=false, onClick,key }) => <div className={(selcted) ? "star selected" : "star"} onClick={()=>onClick(key)}></div>;

        let check=(l)=>{
          if(this.arr[l].selected){
              return "star selected"
          }  else {return "star"}
        };

        return <div>
            {this.arr.map((a)=>
               <Star selcted={a.selected} onClick={this.onGo(a.i) } key={a.i} />
            )}
        </div>
    }

}
const s1=()=>{
    return <div className='star'></div>
};

const s= ({funca})=>{
    let _title,_color;
    const sumbit=e=>{
        e.preventDefault();
        funca(_title.value,_color.value);
        _title.value = '';
        _color.value = '#000000';
        _title.focus()

    };
    return (
        <form onSubmit={sumbit}>
            <input ref={input => _title = input}
                   type="text"
                   placeholder="color title..." required/>
                   <input ref={input => _color = input}
                          type="color" required/>
                          <button>ADD</button>
        </form>    )
};


class App2 extends React.Component
{

    static propTypes={
        funca:PropTypes.func
    };
  constructor(props) {
      super(props);

      this.arra = React.createRef();
      this.submit = this.submit.bind(this);
  }

  submit(e){

      const{_info,_color} = this.refs;
      e.preventDefault();
      this.props.funca(_info.value,_color.value)

  }
  render() {
        const{funca} = this.props;
    return (

        <form onSubmit={this.submit}>
          <input     ref='_info'  onChange={this.change}            type="text"                     placeholder="color title..." required/>
          <input        ref='_color'             type="color" required/>
          <button>ADD</button>
        </form>      )  } }



function App1(props) {
  React.PropTypes={
    items:PropTypes.array
  };

  return (
    <div >

    </div>
  );
}
*/
export default App;
