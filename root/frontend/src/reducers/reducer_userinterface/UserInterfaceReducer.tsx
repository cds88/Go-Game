import {InterfaceActionTypes, TOGGLE_PLAYER, PUSH_ON_STACK, HOVER_ELEMENT, RESIZE_BOARD, SET_MANAGER} from './Actions';
import {UserInterface, StackElement} from './UserInterface';
import { ElementsManager  } from '../../algorithms/ElementsManager';
const InterfaceReducerDefaultState: UserInterface={
     GridLength:9,
     activePlayer:1,
     Stack:[],
     hovered:{x:"A", y:0},
     ElementsManager: null,
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
               state.ElementsManager.input(action.element)
               return {
                    ...state, Stack:[...state.Stack, action.element],
                    ElementsManager: state.ElementsManager                    
               }
          case TOGGLE_PLAYER:
               return {...state, activePlayer:state.activePlayer===1? 2 : 1}
          case RESIZE_BOARD:
               return {...state, GridLength:action.size,
                    ElementsManager: new ElementsManager(action.size),
                    }
          case SET_MANAGER:
               
               return { ...state, ElementsManager: new ElementsManager(state.GridLength)   }
          default:
               return state
     }
}
export {InterfaceReducer}
