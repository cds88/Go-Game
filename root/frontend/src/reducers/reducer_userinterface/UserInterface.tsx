import { ElementsManager , Element} from "../../algorithms/ElementsManager";


export interface UserInterface {
  activePlayer: number;
  Stack: Zone[];
  hovered: { x: string; y: number };
  GridLength: number;
  ElementsManager: ElementsManager;
  Score: {1:number, 2:number}
}



export interface Zone {
    playerId: number;
    x: string;
    y: number;
}

export interface Proximates {
  top: Element;
  bottom: Element;
  left: Element;
  right: Element;
}


export interface ElementStyle {
    height: string;
    width: string;
    border: string;
    margin: string;
    padding: string;

}

export interface ScreenParameters {
  height: number;
  width: number;
  ratio: number;
}
