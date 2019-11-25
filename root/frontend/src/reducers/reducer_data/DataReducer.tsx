
import {Data} from './Data';
import {DataActionTypes, FETCH_IMAGES_BEGIN, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_ERROR} from './Actions';
const DataReducerDefaultState:Data={
    Images : []

}


const DataReducer = (
    state=DataReducerDefaultState,
    action: DataActionTypes
):Data=>{
    switch(action.type){
        case FETCH_IMAGES_BEGIN:
 
            return state
            
        case FETCH_IMAGES_SUCCESS:
       
            return {...state, Images: action.images }
        case FETCH_IMAGES_ERROR:
            return state
        default:
            return state
    }


}

export {DataReducer}




