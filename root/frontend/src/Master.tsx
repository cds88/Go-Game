
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/Resets.scss';
import './styles/Main.scss';
import GridComponent from './components/component_grid/GridComponent';
import BackgroundComponent from './components/component_background/BackgroundComponent';
import styled from "styled-components";
import { connect } from 'react-redux';
import { AppState } from './reducers/ConfigureStore';

import { AllAppActions } from './reducers/actions/AllActionsTypes';

import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from 'redux';
import {FetchImages, SetManager, ResizeBoard} from './reducers/actions/AllActions';

import {StackElement} from './reducers/reducer_userinterface/UserInterface';
import {Image} from './reducers/reducer_data/Data';

export interface MasterProps {

}

interface LinkStateToProps{

    activePlayer:number, 
    stack: StackElement[],
    hovered: {x:string, y:number},
    gridLength: number,
    images: Image[]
}

const mapStateToProps=(
    state: AppState,
    ownProps: MasterProps
): LinkStateToProps=>({
    activePlayer: state.InterfaceReducer.activePlayer,
    stack: state.InterfaceReducer.Stack,
    hovered: state.InterfaceReducer.hovered,
    gridLength: state.InterfaceReducer.GridLength,
    images: state.DataReducer.Images

})
interface LinkDispatchToProps{
    fetchImages: ()=>void
    setManager:()=>void
    resizeBoard: (size:number)=>void
}
const mapDispatchToProps=(
    dispatch: ThunkDispatch<any, any, AllAppActions>,
    ownProps: MasterProps
):LinkDispatchToProps=>({
    fetchImages: bindActionCreators(FetchImages, dispatch),
    setManager: bindActionCreators(SetManager, dispatch),
    resizeBoard: bindActionCreators(ResizeBoard, dispatch)
})

export interface ScreenParameters {
    height: number;
    width: number;
    ratio: number;
}


type Props = MasterProps & LinkStateToProps & LinkDispatchToProps;
export const Master=(Props:Props)=> {

    
    React.useEffect(()=>{
        Props.fetchImages();
        Props.setManager()
    }, [])
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
    
    const handleChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    
       Props.resizeBoard(parseInt(e.target.value))
    }

    return (
        <div className="wrapper">
            {Props.images.length!==0?
                < BackgroundComponent images={Props.images}/> : null
            }
            
            <div className="playersParameters" style={{position:"absolute", top:"7vh", right:"3vw", color:"white"}}>
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
            <div className="gridParameters" style={{color:"white"}}>
                <p style={{margin:"0", padding:"0"}}> <h2 style={{marginRight:"40px"}}>Grid size</h2> <br/></p>
                <select name="" id="" onChange={handleChange} value={Props.gridLength} >
                    <option value={9}>9</option>    
                    <option value={13}>13</option>    
                    <option value={19} >19</option>    
                </select> 
                <button onClick={()=>{window.location.reload()}}>Clear</button>  
            </div>
            <GridComponent screenParameters={screenSize} activePlayer={Props.activePlayer} gridLength={Props.gridLength}/>
        </div>
    );
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Master);



 

