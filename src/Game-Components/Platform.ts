import Layer from "../Layer";
import Tile from "../Tile";
import Vector from "../Vector";
import Color from "../Color";


export default class Platform {

    
    tiles: Array<Tile>;

    

    constructor(width: number, height: number){

        
        

        this.tiles = Array.from({ length: 4 }, (_, i) => {
  
            const x = width + i;
            const y = height;

            return new Tile({
            char: '=',
            color: new Color(255,255,255,255),
            pos: new Vector(x, y)
            });
        });
    }



}


