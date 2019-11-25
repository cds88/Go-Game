import * as  React from 'react'

import {Image} from '../../reducers/reducer_data/Data';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export interface BackgroundProps{
    images: Image[]

}

type Props = BackgroundProps;
const BackgroundComponent=(Props:Props)=> {
    const [activeBG, setActiveBG] = React.useState(0);
    React.useEffect(()=>{
        const interval = setInterval(()=>{setActiveBG(prevActiveBG=> (prevActiveBG+1)%Props.images.length   ) },7000);

        return ()=>{clearInterval(interval)}
        
    }, [])
    
  
    return (
        <div className="fullBG">        
                {Props.images.map(
                    (el, index)=>{
                       
                        return <img src={el.image} key={index} className={`${index===activeBG? "active" : "passive"}`}></img>
                    })
                }
        </div>         
    )
}
export default BackgroundComponent;