import {InterfaceActionTypes, TOGGLE_PLAYER, PUSH_ON_STACK, HOVER_ELEMENT, RESIZE_BOARD} from './Actions';
import {UserInterface} from './UserInterface';

const InterfaceReducerDefaultState: UserInterface={
     GridLength:9,
     activePlayer:1,
     Stack:[],
     hovered:{x:"A", y:0}
};

const InterfaceReducer=(
     state=InterfaceReducerDefaultState,
     action:InterfaceActionTypes)
     :UserInterface=>{
     switch(action.type)
     {
          case HOVER_ELEMENT:
               return {...state, hovered:action.element}
          case PUSH_ON_STACK:
               return {...state, Stack:[...state.Stack, action.element]}
          case TOGGLE_PLAYER:
               return {...state, activePlayer:state.activePlayer===1? 2 : 1}
          case RESIZE_BOARD:
               return state
          default:
               return state
     }
}
export {InterfaceReducer}
