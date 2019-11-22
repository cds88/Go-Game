export interface UserInterface{
    activePlayer: number;
    Stack: StackElement[];
    hovered: {x:string, y:number};
    GridLength: number;
}


export interface StackElement {
    playerId: number;
    x: string;
    y: number;
}
