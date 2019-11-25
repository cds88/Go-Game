import {Image} from './Data';

export const FETCH_IMAGES_BEGIN= "FETCH_IMAGES_BEGIN"
export const FETCH_IMAGES_SUCCESS  = "FETCH_IMAGES_SUCCESS"
export const FETCH_IMAGES_ERROR  = "FETCH_IMAGES_ERROR"


export interface FetchImagesBegin{
    type: typeof FETCH_IMAGES_BEGIN

}

export interface FetchImagesSuccess{
    type: typeof FETCH_IMAGES_SUCCESS
    images:Image[]
   
}
export interface FetchImagesError{
    type: typeof FETCH_IMAGES_ERROR
}



export type DataActionTypes=
    | FetchImagesBegin
    | FetchImagesSuccess
    | FetchImagesError


export type AppActions = DataActionTypes;