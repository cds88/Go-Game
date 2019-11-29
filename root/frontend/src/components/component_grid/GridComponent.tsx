import * as React from 'react'
import ZoneComponent from "./components/ZoneComponent";
import {ScreenParameters} from '../../reducers/reducer_userinterface/UserInterface';
import { CSSProperties } from 'styled-components';
import {connect} from 'react-redux';
import { ElementsManager} from '../../algorithms/ElementsManager';
import { AppState } from '../../reducers/ConfigureStore';
export interface GridProps{
    screenParameters: ScreenParameters;
    activePlayer: number;
    gridLength: number;
}
interface LinkStateToProps{
    ElementsManager: ElementsManager
}
const mapStateToProps=(state: AppState,ownProps: GridProps):LinkStateToProps=>({
    ElementsManager: state.InterfaceReducer.ElementsManager
})
type Props= GridProps & LinkStateToProps;
const GridComponent=(Props:Props)=> {
    const GridLength: number = Props.gridLength;

    const sizing = React.useRef<HTMLDivElement>();
    const maxHeight = Props.screenParameters.height*0.75;
    const amount = maxHeight/GridLength;
    const elementHeight=amount;
    const elementWidth=amount;
    

    const gridWrapper={
        position: "fixed" as "fixed",
        left: "50%",
        top: "50%",
        transform: `translateX(${-(elementWidth*GridLength)/2}px) translateY(-${(elementHeight*GridLength)/2}px) `,
        boxSizing: "border-box",
        height: `${elementHeight*GridLength}`,
        width: `${elementWidth*GridLength}`,
        display:"grid",
        gridTemplateColumns: `repeat(${GridLength-1},1fr)`,
        margin: "0",
        padding: "0",
        background:"brown",
        
       
    } as CSSProperties
    const gridWrapperElement={
        height:`${elementHeight}px`,
        width: `${elementWidth}px`,
        border: "1px solid black",
        margin: "0",
        padding: "0",
    } as CSSProperties
    const gridElements={
        position: "fixed" as "fixed",
        boxSizing: "border-box",
        top: '50%',
        left: "50%",
        transform: `translateX(${-(elementWidth * GridLength)/2-elementWidth/2}px) translateY(-${(elementHeight * GridLength) / 2 + elementHeight/2}px)`,
        height: `${elementHeight * GridLength}`,
        width: `${elementWidth * GridLength}`,
        display: "grid",
        gridTemplateColumns: `repeat(${GridLength},1fr)`,
        margin: "0",
        padding: "0",
       
    } as CSSProperties
    const gridElementsElement = {
      height: `${elementHeight}px`,
      width: `${elementWidth}px`,
      border: "1px solid transparent",
      transition: "0.2s",
      margin: "0",
      padding: "0"
    }  
    if (!Props.ElementsManager){
        return <h1>Loading</h1>
    }
    const Grid = []
    for (var i = 0; i < GridLength*(GridLength-2)+1; i++) {
       
         
            Grid.push(
                <div key={i } style={gridWrapperElement} >     </div>
            )
         
    }
  

    const assignMarker=(x:number, y:number, size:number):boolean=>{
        if (size===19 && ((x===4 || x===10 || x===16) && (y===4 || y===10 || y===16)))
                return true
        if (size === 13 && (( x===4 || x===7 || x===10 ) && (y===4 || y===7 || y===10)))
                return true
        if (size === 9 && (( (x===3 || x===7 ) && (y===3 || y===7 )) || (x===5 && y===5)))
                return true                                      
    }

 
    
    const Elements = Props.ElementsManager.Elements.map((el, index)=>{
        return (
          <ZoneComponent
            key={index}
            elementStyle={gridElementsElement}
            x={el.x}
            y={el.y}
            activePlayer={Props.activePlayer}
            showXindexes={el.y === 1 ? true : false}
            isMarker={assignMarker(
              el.x.charCodeAt(0) - 64,
              el.y,
              Props.gridLength
            )}
            isIndex={el.y === 1 ? true : false}
            playerId={el.playerId}
            groupId={el.groupdId}
       
          />
        );
    })
    
    return (
        <>
        <div style={gridWrapper} className="gridWrapper" ref={sizing}>
            {Grid}
        </div>

        <div style={gridElements} className="gridElements">
            {Elements}
        </div>   
        </>
    )
}


export default connect( mapStateToProps, null)( GridComponent)
