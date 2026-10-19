import Layer from "../Layer";
import Tile from "../Tile";
import Vector from "../Vector";
import Color from "../Color";


export default class TextBox{

    tiles: Array<Tile>;

    constructor(text: string, startPos: Vector){

        this.tiles = Array.from({length: text.length}, (_,i) => {
            const character = text[i];
            const positionX = startPos.x + i;

            return new Tile({
                char: character,
                pos: new Vector(positionX, startPos.y)
            });

            
        });


    }
    

}

