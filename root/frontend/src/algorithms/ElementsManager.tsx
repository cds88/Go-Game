export interface StackElement{
    playerId: number;
    x: string;
    y: number;
}
// console.log( (ele.x.charCodeAt(0)-65))
export const toStr=(x:number)=>{
    return String.fromCharCode(x+65)
}
export interface Neighbours{
    top: StackElement;
    left: StackElement;
    right: StackElement;
    bottom: StackElement;
}
export class Elem {
    x: string;
    y: number;
    playerId: number;
    neighbours: Neighbours;

    constructor(x: string, y: number, player: number, neighbours: Neighbours
    
         ) {
        this.x = x;
        this.y = y;
        this.playerId=player;
        this.neighbours=neighbours;
    }
    access(player:number){
        this.playerId=player
    

    }
 


}
export class ElementsManager{
    gridLength:number;
    elements: Elem[]=[];
    movesMade:number=0;
    constructor(gridLength:number ){
        this.gridLength=gridLength;
        this.init();
    }
 
    progress(){
        this.movesMade = this.movesMade+1
    }
    borderizer(x:number,y:number ):Neighbours{
        var top, bottom, left, right   :StackElement;
    

            if(x===0) left=null
            else left= { x: String.fromCharCode(x + 64), y: y, playerId:0 } 
            if(x===this.gridLength) right=null 
            else right = { x: String.fromCharCode(x + 66), y: y, playerId: 0}
            if(y===this.gridLength) top=null 
            else top = { x: String.fromCharCode(x+65), y: y + 1, playerId: 0}
            if(y===1) bottom= null
            else bottom = { x: String.fromCharCode(x+65), y: y + -1, playerId: 0}

        var results:Neighbours={
            top:top, bottom:bottom, left:left, right: right}
   
            return results
            
            
           
    }

    init(){
        for(let y=this.gridLength; y>0; y--){
            for(let x=0; x<this.gridLength; x++){
                
                this.elements.push(
                    
                    new Elem(toStr(x) , y, 0 , this.borderizer(x,y)  )
                    
                    )
            }
        }
    }
 
    input(ele:StackElement){
 
        var result = this.elements.find((el)=>{
            return el.x===ele.x && el.y===ele.y
        })
        result.access(ele.playerId) 
            
        this.progress()                 
    }
    getRepr(){
       
        const result = this.elements.reduce(
            (str, el, index)=>{
                
                if( (index+1)%this.gridLength===0 ){
                    var result = `${el.playerId}\n`
                     return str.concat(result)
                }

                return str.concat(el.playerId.toString())
            }, "")

            console.log(result);
      
    }

   
}






