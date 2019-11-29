import {TOGGLE_PLAYER, OCCUPY_ZONE, HOVER_ELEMENT, RESIZE_BOARD, SET_MANAGER} from '../reducer_userinterface/Actions';
import {Zone} from '../reducer_userinterface/UserInterface';
import { AllAppActions } from './AllActionsTypes';
import {FETCH_IMAGES_BEGIN, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_ERROR} from '../reducer_data/Actions';
import {Image} from '../reducer_data/Data';

import axios from 'axios';
import { Dispatch  } from "redux";
import { AppState } from '../ConfigureStore';



export const TogglePlayer=():AllAppActions=>({
    type: TOGGLE_PLAYER
})


export const OccupyZone = (Zone: Zone): AllAppActions => ({
         type: OCCUPY_ZONE,
         Zone
       });

export const HoverElement = (element: { x: string, y: number }): AllAppActions=>({
    type: HOVER_ELEMENT,
    element
})

export const ResizeBoard = (size:number): AllAppActions=>({
    type: RESIZE_BOARD,
    size
})

export const SetManager=():AllAppActions=>({
    type: SET_MANAGER
})
export const FetchImagesBegin=():AllAppActions=>({
    type: FETCH_IMAGES_BEGIN
})

export const FetchImagesSuccess = (images:Image[] ): AllAppActions => ({
    type: FETCH_IMAGES_SUCCESS,
    images
    
})
export const FetchImagesError = (): AllAppActions => ({
    type: FETCH_IMAGES_ERROR
})


export const FetchImages =()=>{
    return(dispatch:Dispatch<AllAppActions>, getState:()=>AppState)=>{
        dispatch(FetchImagesBegin());
        axios('/data/images/').then( (e)=>e.data).then(e=>
            {dispatch(FetchImagesSuccess( e)) })
    }
}