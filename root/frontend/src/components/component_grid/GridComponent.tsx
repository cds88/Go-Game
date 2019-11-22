import * as React from 'react'
import Element from './components/Element';
import {ScreenParameters} from '../../Master';
import { CSSProperties } from 'styled-components';

export interface GridProps{
    screenParameters: ScreenParameters;
    activePlayer: number;
    gridLength: number;
}

type Props= GridProps;
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
        background:"brown"
    } as CSSProperties
    const gridWrapperElement={
        height:`${elementHeight}px`,
        width: `${elementWidth}px`,
        border: "1px solid black",
        margin: "0",
        padding: "0"
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
        ZIndex: "1"
    } as CSSProperties
    const gridElementsElement={
        height: `${elementHeight}px`,
        width: `${elementWidth}px`,
        border: "1px solid transparent",
        transition: "0.2s",   
        margin:"0",
        padding: "0"
    }  
    const Grid = []
    for (var i = 0; i < GridLength*(GridLength-2)+1; i++) {
       
         
            Grid.push(
                <div key={i } style={gridWrapperElement} >     </div>
            )
         
    }
    const Elements = []

    const assignMarker=(x:number, y:number, size:number):boolean=>{
        if (size===19 && ((x===4 || x===10 || x===16) && (y===4 || y===10 || y===16)))
                return true
        if (size === 13 && (( x===4 || x===7 || x===10 ) && (y===4 || y===7 || y===10)))
                return true
        if (size === 9 && (( (x===3 || x===7 ) && (y===3 || y===7 )) || (x===5 && y===5)))
                return true                                      
    }
    for (var y = GridLength; y >0; y--) {
        for (var x=1; x<=GridLength ; x++)
        {
        Elements.push(
             
            <Element key={x+"_"+y} elementStyle={gridElementsElement} x={String.fromCharCode(x-1 + 65)} y={y} 
            activePlayer={Props.activePlayer} showXindexes={(x+1===GridLength)? true : false}
            isMarker={ assignMarker(x,y, GridLength) }
            isIndex={(y=== 1)? true : false }
            />
        )
        }
    }
    
    
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


export default GridComponent;
