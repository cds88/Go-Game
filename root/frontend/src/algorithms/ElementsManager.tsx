import {Zone, Proximates} from '../reducers/reducer_userinterface/UserInterface'; 
import { element } from 'prop-types';
 
export const toStr=(x:number ):string =>{
      return String.fromCharCode(x+65)  ;
}
export const toNum = (x:string):number=>{
   return x.charCodeAt(0)-65
}
 
export class Element {
    id: number;
    groupdId:number;
    x: string;
    y: number;
    playerId: number;
    enemyId: number;
    Liberties: number;
    MaxLiberties: number;
    isOccupied: boolean;
    hasLiberties: boolean;
    Proximates: Proximates;
    Allies: Element[];
    isCaptured: boolean;
     

  constructor(x: string, y: number, id:number){
        this.x = x;
        this.y = y;
        this.playerId=0;
        this.enemyId=0;
        this.hasLiberties=true;
        this.id = id;
        this.isCaptured=false;
        this.groupdId = 0;
         
    }
    Occupy(player:number){
        this.playerId=player;
        this.isOccupied=true;
        player===1? this.enemyId=2 : this.enemyId=1;
        Object.values(this.Proximates).filter(el=>{return el!==null}).forEach(el=>{
          el.SetLiberties()
        })
    }
    SetProximates(Proximates:Proximates){
      this.Proximates=Proximates
      this.MaxLiberties = Object.values(Proximates).filter(el=>{return el!==null}).length
    }
    SetAllies(){
      this.Allies = Object.values(this.Proximates).filter(el => { return el !== null }).filter(el=>{return el.playerId===this.playerId})
      
    }
    SetLiberties(){
      
      this.Liberties= Object.values(this.Proximates).filter(el=>{return el!==null}).reduce<number[]>(
        (array, el)=>{
        return [...array, el.playerId]
      },[]).filter(el=>{return el===0}).length

      if(this.Liberties===0){
        this.hasLiberties=false
      }
       
    }
    GetCaptured(){
      this.isCaptured=true;

    }
 
    

 
}

export class ElementsManager {
         GridLen: number;
         Elements: Element[] = [];
         groupCounter: number;
         MovesMade: number = 0;
         Score: {1: number, 2:number}
         constructor(gridLength: number) {
           this.GridLen = gridLength;
           this.Score = {1:0, 2:0};
           this.Init();
           this.SetProximates();
           this.groupCounter=0;
         }

         Progress() {
           this.MovesMade = this.MovesMade + 1;
         }

         Init() {
           var index:number=0;
           for (let y = this.GridLen; y > 0; y--) {
             for (let x = 0; x < this.GridLen; x++) {
               this.Elements.push(new Element(toStr(x), y, index));
               index= index+1;
             }
           }
         }
         SetProximates() {
           this.Elements.forEach((el, index) => {
             el.SetProximates(this.CalcProximates(el.x, el.y, this.GridLen));
             el.SetLiberties();
           });
         }

         findElement(Zone: Zone) {
           return this.Elements.find(el => {
             return el.x === Zone.x && el.y === Zone.y;
           });
         }

         CalcProximates = (x: string, y: number, gridlen: number) => {
           var Proximates = {
             top:
               y === gridlen
                 ? null
                 : this.findElement({ x: x, y: y + 1, playerId: 0 }),
             bottom:
               y === 1
                 ? null
                 : this.findElement({ x: x, y: y - 1, playerId: 0 }),
             left:
               x === "A"
                 ? null
                 : this.findElement({
                     x: String.fromCharCode(x.charCodeAt(0) - 1),
                     y: y,
                     playerId: 0
                   }),
             right:
               x === String.fromCharCode(gridlen - 1 + 65)
                 ? null
                 : this.findElement({
                     x: String.fromCharCode(x.charCodeAt(0) + 1),
                     y: y,
                     playerId: 0
                   })
           };
           return Proximates;
         };
         GetRepr() {
           const result = this.Elements.reduce((str, el, index) => {
             if ((index + 1) % this.GridLen === 0) {
               var result = `${el.playerId}\n`;
               return str.concat(result);
             }

             return str.concat(el.playerId.toString() + " ");
           }, "");

           console.log(result);
          }
         Admission(Zone: Zone) {
           var result = this.Elements.find(el => {
             return el.x === Zone.x && el.y === Zone.y;
           });
           result.Occupy(Zone.playerId);
           


                    
          var stones = this.Elements.filter(el=>{
             return el.isOccupied===true
           })
           
           stones.forEach((el)=>{
             el.SetAllies()
           })

          
           stones.forEach(el=>{
              if(!el.hasLiberties && !el.isCaptured){
                if (el.Allies.length === 0) {
                  el.GetCaptured()
                  switch (el.enemyId) {
                    case 1:
                      this.Score[1] = this.Score[1] + 1
                      break;
                    case 2:
                      this.Score[2] = this.Score[2] + 1
                      break;
                  }
                }

                else if(el.Allies.length<el.MaxLiberties){
                   this.Liberator(   [el], [el] )
                }                
              }
           })                 
         } 

  Liberator( qeueue: Element[] = [], BFS: Element[] = [] , groupCounter:number=null  ):any{
          if(!groupCounter){
            groupCounter=this.groupCounter
          }
          var Element=qeueue[0];       
          Element.groupdId=groupCounter

          var bset = new Set(BFS)
          var sas = Element.Allies.filter((el) => !bset.has(el))                         
     
          qeueue.shift();
    
          qeueue.push(...sas); 
          BFS.push(...sas)

       
        if(qeueue.length===0){
          console.log(BFS)
          return null
        }
       
          return this.Liberator(qeueue, BFS, groupCounter )                             
        }              
       }
export interface Group {
  id: number;
  elements: Element[];
  eyes?: number;
  isCaptured: boolean;
}





