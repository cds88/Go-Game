import {TOGGLE_PLAYER, PUSH_ON_STACK, HOVER_ELEMENT, RESIZE_BOARD} from '../reducer_userinterface/Actions';
import {StackElement} from '../reducer_userinterface/UserInterface';
import { AllAppActions } from './AllActionsTypes';


export const TogglePlayer=():AllAppActions=>({
    type: TOGGLE_PLAYER
})


export const PushOnStack=(element: StackElement):AllAppActions=>({
    type: PUSH_ON_STACK,
    element
})

export const HoverElement = (element: { x: string, y: number }): AllAppActions=>({
    type: HOVER_ELEMENT,
    element
})

export const ResizeBoard = (): AllAppActions=>({
    type: RESIZE_BOARD
})