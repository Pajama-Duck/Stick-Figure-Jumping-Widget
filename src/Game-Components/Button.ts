import Tile from "../Tile";
import Vector from "../Vector";
import Color from "../Color";
import TextBox from "./TextBox";



//not finished. Can give you a nice piece of centered text in a box but that is about it
export default class Button extends EventTarget{

    tiles: Array<Tile>

    

    constructor(width: number, height: number, upperCorner: Vector, text = '') {
        super();
        if (width < text.length + 2){
            width = text.length + 2;
        }
        if (height < 3){
            height = 3;
        }

        var printingText = 0;
        
        this.tiles = Array.from({length: width * height}, (_, i) => {
            var char = ' ';
            
            // box around the outside of the button
            if(i == 0){
                char = '╔';
            } else if(i == width - 1) {
                char = '╗';
            } else if(i == width * height - width){
                char = '╚';
            } else if(i == width * height - 1){
                char = '╝';
            } else if (i < width || i >= width * height - width){
                char = '═';
            } else if(i % width == 0 || i % width == width - 1 ){
                char = '║'
            } else {
                char = ' ';
            }

            //center the text if possible
            if(i == Math.floor(height/2) * width + Math.floor(width/2 - 2)){
                char = text[0];
                printingText += 1;
            } else if (printingText != 0 && printingText < text.length ) {
                char = text[printingText];
                printingText +=1;
            }

            var x = i;
            var y = upperCorner.y;
            while(x >= width){
                x-=width;
                y += 1;
            }
            x += upperCorner.x

            return new Tile({
                char: char,
                pos: new Vector(x, y)
            });
        });
        
    }

}