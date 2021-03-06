import * as  React from 'react'
import { AllAppActions } from '../../../reducers/actions/AllActionsTypes';
import { connect } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from 'redux';

import { TogglePlayer, OccupyZone, HoverElement} from '../../../reducers/actions/AllActions';
import {
  Zone,
  ElementStyle
} from "../../../reducers/reducer_userinterface/UserInterface";



export interface ZoneProps{
    x:string;
    y:number;
    elementStyle: ElementStyle;
    activePlayer: number;
    showXindexes?:boolean;
    isMarker: boolean;
    isIndex: boolean;
    playerId: number;
    groupId: number;
}
interface LinkDispatchToProps{
    togglePlayer:()=>void
    occupyZone:(Zone:Zone)=>void
    hoverElement:(element:{x:string,y:number})=>void
    
}
const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllAppActions>,
  ownProps: ZoneProps
): LinkDispatchToProps => ({
  togglePlayer: bindActionCreators(TogglePlayer, dispatch),
  occupyZone: bindActionCreators(OccupyZone, dispatch),
  hoverElement: bindActionCreators(HoverElement, dispatch)
});
    

 
type Props =  ZoneProps & LinkDispatchToProps;
const ZoneComponent = (Props: Props) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const handleClick = () => {
    Props.occupyZone({
      playerId: Props.activePlayer,
      x: Props.x,
      y: Props.y
    });
    Props.togglePlayer();
  };
  const handleOccupied=()=>{
    
  }
  const handleHover = () => {
    setIsHovered(true);
    Props.hoverElement({ x: Props.x, y: Props.y });
  };

  const handleUnhover = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        ...Props.elementStyle,
        borderRadius: Props.elementStyle.height,
        zIndex: 1,
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
      onClick={Props.playerId !== 0 ? handleOccupied : handleClick}
      onMouseOver={handleHover}
      onMouseOut={handleUnhover}
      className={`${
        Props.playerId !== 0 ? `activePlayer${Props.playerId} ` : null
      } ${
        isHovered && Props.playerId === 0
          ? `elementHovered${Props.activePlayer}`
          : null
      }`}
    >
     
      {Props.isMarker ? (
        <div
          className="pointer"
          style={{
            height: `${parseInt(Props.elementStyle.height) / 4}px`,
            width: `${parseInt(Props.elementStyle.width) / 4}px`,
            background: `${
              Props.playerId !== 0 && Props.playerId === 1
                ? "rgb(119, 117, 117)"
                : "black"
            }`,
            borderRadius: `${parseInt(Props.elementStyle.height) / 4}px`
          }}
        />
      ) : null}

      {Props.x === "A" ? (
        <p
          style={{
            position: "absolute",
            left: "0",
            color: `${
              Props.playerId !== 0
                ? `${Props.playerId === 1 ? "white" : "black"}`
                : "white"
            }`
          }}
        >
          {Props.y}
        </p>
      ) : null}

      {Props.isIndex ? (
        <p
          style={{
            marginTop: `${parseInt(Props.elementStyle.height) / 1.5}px`,
            color: `${
              Props.playerId !== 0
                ? `${Props.playerId === 1 ? "white" : "black"}`
                : "white"
            }`
          }}
        >
          {" "}
          {Props.x}{" "}
        </p>
      ) : null}

      {Props.playerId !== 0 ? 
         
        <p style={{position: "absolute", left:"50%", top:"50", fontWeight:"bold", 
        transform: "translateX(-50%) ",
        fontSize:"120px",
        color:`${Props.playerId===1? "white" : "brown"}`
        }}>   
        {/* {  Props.groupId} */}
         </p>
       
       : null}
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ZoneComponent);