import {StackElement} from './UserInterface';
export const TOGGLE_PLAYER = "TOGGLE_PLAYER"
export const PUSH_ON_STACK = "PUSH_ON_STACK"
export const HOVER_ELEMENT = "HOVER_ELEMENT"
export const SET_MANAGER = "SET_MANAGER"
export const RESIZE_BOARD = "RESIZE_BOARD" 



export interface ResizeBoard{
    type: typeof RESIZE_BOARD;
    size: number;
}

export interface TogglePlayer {
    type: typeof TOGGLE_PLAYER;
}
export interface PushOnStack {
    type: typeof PUSH_ON_STACK;
    element: StackElement;
}
export interface SetManager{
    type: typeof SET_MANAGER
}

export interface HoverElement{
    type: typeof HOVER_ELEMENT;
    element: {x:string, y:number};
}
export type InterfaceActionTypes=
    |  TogglePlayer
    |  PushOnStack
    |  HoverElement
    |  ResizeBoard
    |  SetManager

export type AppActions = InterfaceActionTypes;

 
