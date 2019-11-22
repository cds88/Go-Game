
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/Resets.scss';
import './styles/Main.scss';
import GridComponent from './components/component_grid/GridComponent';
import styled from "styled-components";
import { connect } from 'react-redux';
import { AppState } from './reducers/ConfigureStore';

import {StackElement} from './reducers/reducer_userinterface/UserInterface';
export interface MasterProps {

}

interface LinkStateToProps{

    activePlayer:number, 
    stack: StackElement[],
    hovered: {x:string, y:number},
    gridLength: number
}

const mapStateToProps=(
    state: AppState,
    ownProps: MasterProps
): LinkStateToProps=>({
    activePlayer: state.InterfaceReducer.activePlayer,
    stack: state.InterfaceReducer.Stack,
    hovered: state.InterfaceReducer.hovered,
    gridLength: state.InterfaceReducer.GridLength

})

export interface ScreenParameters {
    height: number;
    width: number;
    ratio: number;
}


type Props = MasterProps & LinkStateToProps;
export const Master=(Props:Props)=> {

    function useWindowSize() {
        const [size, setSize] = React.useState<ScreenParameters>({
            height: window.outerHeight,
            width: window.outerWidth,
            ratio: window.innerWidth / window.innerHeight
        });
        React.useLayoutEffect(() => {
            function updateSize() {
                setSize({
                    height: window.outerHeight,
                    width: window.outerWidth,
                    ratio: window.innerWidth / window.innerHeight
                })
            }
            window.addEventListener('resize', updateSize);
        }, []);
        return size
    }

    const screenSize: ScreenParameters = useWindowSize();
    const [GridLength, setGridLength] = React.useState(19);
    const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
       setGridLength(parseInt(e.target.value))
    }

    return (
        <div className="wrapper">

            <div className="playersParameters" style={{position:"absolute", top:"7vh", right:"3vw"}}>
                <div className="container">
                    <h1 >
                    Active:{JSON.stringify(Props.activePlayer)} </h1> 
                    
                    <div className="currentPlayer" 
                    style={{
                    width:"50px", height:"50px", margin:"15px",
                    borderRadius:"50px", 
                    background:`${Props.activePlayer===1? "black" : "white"}`}}
                    
                    />
                </div>
                <h1>Position: {Props.hovered.x} {Props.hovered.y}</h1>
            </div>
            <div className="gridParameters">
                <p style={{margin:"0", padding:"0"}}> <h2 style={{marginRight:"40px"}}>Grid size</h2> <br/></p>
                <select name="" id="" onChange={handleChange}>
                    <option value={9}>9</option>    
                    <option value={13}>13</option>    
                    <option value={19} selected={true}>19</option>    
                </select> 
                <button onClick={()=>{window.location.reload()}}>Clear</button>  
            </div>
            <GridComponent screenParameters={screenSize} activePlayer={Props.activePlayer} gridLength={GridLength}/>
        </div>
    );
    
}

export default connect(mapStateToProps, null)(Master);



 

