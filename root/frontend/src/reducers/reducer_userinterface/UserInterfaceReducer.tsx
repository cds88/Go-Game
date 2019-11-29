import {InterfaceActionTypes, TOGGLE_PLAYER, OCCUPY_ZONE, HOVER_ELEMENT, RESIZE_BOARD, SET_MANAGER} from './Actions';
import { UserInterface, Zone } from "./UserInterface";
import { ElementsManager } from "../../algorithms/ElementsManager";
 
const InterfaceReducerDefaultState: UserInterface = {
  GridLength: 9,
  activePlayer: 1,
  Stack: [],
  hovered: { x: "A", y: 0 },
  ElementsManager: null,

  Score:{1:0, 2:0}
  
  
};


 
 
const InterfaceReducer=(
     state=InterfaceReducerDefaultState,
     action:InterfaceActionTypes)
     :UserInterface=>{
     switch (action.type) {
       case HOVER_ELEMENT:
  
         return { ...state, hovered: action.element };
       case OCCUPY_ZONE:
         state.ElementsManager.Admission(action.Zone);
         
         state.Score = state.ElementsManager.Score
           
         return {
           ...state,
           Stack: [...state.Stack, action.Zone],
           ElementsManager: state.ElementsManager, Score: state.Score
         };
       case TOGGLE_PLAYER:
         return { ...state, activePlayer: state.activePlayer === 1 ? 2 : 1 };
       case RESIZE_BOARD:
         return {
           ...state,
           GridLength: action.size,
           ElementsManager: new ElementsManager(action.size),
           Score:{1:0, 2:0}
         };
       case SET_MANAGER:
         return {
           ...state,
           ElementsManager: new ElementsManager(state.GridLength)
         };
       default:
         return state;
     }
}
export {InterfaceReducer}
