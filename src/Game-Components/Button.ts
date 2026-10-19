import Tile from "../Tile";
import Vector from "../Vector";
import Color from "../Color";

export default class Button {

    tiles: Array<Tile>

    constructor(text: string, width: number, height: number, ){
        if (width < text.length + 2){
            width = text.length + 2;
        }
        if (height < 3){
            height = 3;
        }

        this.tiles = Array.from({length: width * height}, (_, i) => {
            if (width % i == 0 || width % i == 1 || i <= width || i >= length - width){
                var char = '=';
            } else {
                var char = '';
            }

            return new Tile({
                char: char,
            });
        });
    }
}