import { ElementsManager} from '../../algorithms/ElementsManager';


export interface UserInterface{
    activePlayer: number;
    Stack: StackElement[];
    hovered: {x:string, y:number};
    GridLength: number;
    ElementsManager: ElementsManager;
    
}



export interface StackElement {
    playerId: number;
    x: string;
    y: number;
}
