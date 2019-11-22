import * as  React from 'react'
import { AllAppActions } from '../../../reducers/actions/AllActionsTypes';
import { connect } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from 'redux';

import { TogglePlayer, PushOnStack, HoverElement} from '../../../reducers/actions/AllActions';
import {StackElement} from '../../../reducers/reducer_userinterface/UserInterface';

interface ElementStyle {
    height: string;
    width: string;
    border: string;
    margin: string;
    padding: string;

}

export interface ElementProps{
    x:string;
    y:number;
    elementStyle: ElementStyle;
    activePlayer: number;
    showXindexes?:boolean;
    isMarker: boolean;
    isIndex: boolean;
}
interface LinkDispatchToProps{
    togglePlayer:()=>void
    pushOnStack:(element:StackElement)=>void
    hoverElement:(element:{x:string,y:number})=>void
}
const mapDispatchToProps=(
    dispatch: ThunkDispatch<any, any, AllAppActions>,
    ownProps: ElementProps
):LinkDispatchToProps=>({
    togglePlayer: bindActionCreators(TogglePlayer, dispatch) ,
    pushOnStack: bindActionCreators(PushOnStack, dispatch),
        hoverElement: bindActionCreators(HoverElement, dispatch) })
    

interface ElementStatus{
    isUtilized : boolean;
    playerId: number;
    isHovered: boolean;
}

type Props =  ElementProps & LinkDispatchToProps;
const Element=(Props:Props)=> {
 
    const [elementStatus, setElementStatus] = React.useState<ElementStatus>({
        isUtilized:false,
        isHovered:false,
        playerId: null
    })
    const handleClick=()=>{
        setElementStatus({
            isUtilized: true,
            playerId: Props.activePlayer,
            isHovered: elementStatus.isHovered
        })
        Props.pushOnStack({
            playerId:Props.activePlayer,
            x: Props.x,
            y: Props.y
        })
        Props.togglePlayer();
    }

    const handleHover=()=>{
        setElementStatus({
            isUtilized: elementStatus.isUtilized,
            playerId: elementStatus.playerId,
            isHovered: true
        })
        Props.hoverElement({x:Props.x, y:Props.y})
    }

    const handleUnhover=()=>{
        setElementStatus({
            isUtilized:elementStatus.isUtilized,
            playerId: elementStatus.playerId,
            isHovered: false
        })
    }
 
    return (
        <div style={{...Props.elementStyle, 
        borderRadius:Props.elementStyle.height,
        zIndex:1, 
        display: "grid", justifyContent:"center", alignItems:"center"}}
        onClick={elementStatus.isUtilized? null : handleClick} 
        onMouseOver={handleHover}
        onMouseOut={handleUnhover}
        className={`${elementStatus.isUtilized ? `activePlayer${elementStatus.playerId} ` : null} ${(elementStatus.isHovered && !elementStatus.isUtilized) ? `elementHovered${Props.activePlayer}` : null}`}
        >
            {Props.isMarker? 
            <div className="pointer"
            style={{ 
                height: `${parseInt(Props.elementStyle.height) / 4}px`, width: `${parseInt(Props.elementStyle.width) / 4}px`, background: `${(elementStatus.isUtilized && elementStatus.playerId === 1) ? "rgb(119, 117, 117)" : "black"}`, borderRadius: `${parseInt(Props.elementStyle.height) / 4}px`}}
            />
            : null} 

            {(Props.x==="A")? <p style={{position: "absolute", left:"0"}}>{Props.y}</p> : null }

            {Props.isIndex? 
            <p style={{marginTop:`${parseInt(Props.elementStyle.height)/1.5}px`}}> {Props.x} </p> 
            : null}

        </div>
    )
}

export default connect(null, mapDispatchToProps)(Element);