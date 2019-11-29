import {Zone} from './UserInterface';
export const TOGGLE_PLAYER = "TOGGLE_PLAYER"
export const OCCUPY_ZONE = "OCCUPY_ZONE";
export const HOVER_ELEMENT = "HOVER_ELEMENT"
export const SET_MANAGER = "SET_MANAGER"
export const RESIZE_BOARD = "RESIZE_BOARD" 

export const CLICK_OCCUPIED= "CLICK_OCCUPIED"


export interface ResizeBoard{
    type: typeof RESIZE_BOARD;
    size: number;
}

export interface TogglePlayer {
    type: typeof TOGGLE_PLAYER;
}
export interface OccupyZone {
  type: typeof OCCUPY_ZONE;
  Zone: Zone;
}
export interface SetManager{
    type: typeof SET_MANAGER
}

export interface HoverElement{
    type: typeof HOVER_ELEMENT;
    element: {x:string, y:number};
}
export interface ClickOccupied{
  type: typeof CLICK_OCCUPIED
  Zone: Zone;
}
export type InterfaceActionTypes =
  | TogglePlayer
  | OccupyZone
  | HoverElement
  | ResizeBoard
  | SetManager
  | ClickOccupied

export type AppActions = InterfaceActionTypes;

 
