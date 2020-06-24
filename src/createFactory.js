import {createStore} from "redux";
import stateA from "./state";
let store_ = createStore(setAnithink);
store_.subscribe(()=>{
    console.log(store_.getState());
});
function setAnithink(state=stateA,action){
    if(action.type==="ADD_MAIN_STATE"){

      state.Headers.numberNews=action.numb;
      if (action.mainNew_.length>24){
          state.Headers.mainNew=action.mainNew_.substr(0,24)+"...";
      }else {
          state.Headers.mainNew=action.mainNew_;
      }

        state.Headers.mainNewID=action.id_;

        return state;

        // return[
        //     ...state,
        //     action.myClass
        // ]
    }
    if(action.type==='CLEAR_BUFF'){
        state.MainData.coment=[]
        return state
    }
    if(action.type === "SET_LAST_BLOCKS_NEWS"){
        state.Headers.dataNews=action.arr;
        return state
    }
    if(action.type==='GET_COMENTS'){
        state.MainData.coment=action.coments
        return state
    }
    if(action.type==="CHECK_USER"){
       // console.log(state.user)
        state.user = action.name;
        //console.log(state.user)
        return state
    }
    if(action.type === "SET_LAST_BLOCKS_STATES"){
        state.Headers.dataStates=action.arr;
        return state
    }
    if(action.type==="SET_MAIN_LIST_STATES"){
        state.MainData.dataMainStates=action.arr;
        return state;
    }
    if(action.type==='UPDATE_ID_NEWS'){
        state.MainData.lastIdNews=action.id_;
        console.log(action.id_)
        return state;
    }
    if(action.type==='UPDATE_ID_STATES'){
        state.MainData.lastIdStates=action.id;
        return state;
    }
    if(action.type ==="SET_MAIN_LIST_NEWS"){
        state.MainData.dataMainNews=action.arr;
        return state;
    }
    if(action.type==="ADD_MORE_INFORMATION_TO_LIST_NEWS"){
       action.arr.map(data=>state.MainData.dataMainNews.push(data))
       console.log(state.MainData.dataMainNews);

        return state;
    }
    if(action.type==="UPDATE_STATE_NUMBER"){
        state.Headers.numberStates=action.numb_;
        return state;
    }
    if(action.type==="NOW_BLOCK_SET"){
        state.MainData.nowBlock=action.data_;
        return state;
    }
    if(action.type==="ADD_MORE_INFORMATION_TO_LIST_STATES"){
        action.arr.map(data=>state.MainData.dataMainStates.push(data))
        console.log(state.MainData.dataMainStates);

        return state;
    }
    if(action.type==="EXEC"){
        state.Loading=true;
        return state;
    }
    if(action.type==="SEARCH_BLOCK_SET"){
        if(action.arr.length>0) {
            state.Buffer = action.arr;
        }
        else {
            state.Buffer=[]
        }
        state.Loading=!state.Loading;
        return state;
    }

    if(action.type==="REPLAY_FIRST"){
        if(state[0]==='star'){
            state[0]='star selected'
        }
        else {
            state[0]='star'
        }

    }

    return state;

}
export default store_;
