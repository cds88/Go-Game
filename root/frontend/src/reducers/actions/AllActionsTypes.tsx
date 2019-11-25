import { InterfaceActionTypes} from '../reducer_userinterface/Actions';
import {DataActionTypes} from '../reducer_data/Actions';
export type AllActionTypes =
        | InterfaceActionTypes
        | DataActionTypes


export type AllAppActions = AllActionTypes
