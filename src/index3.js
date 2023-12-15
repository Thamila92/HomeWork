 import * as drawlib from "./drawlib.js";
import { get2DContextById } from "./drawlib.js";

import * as color from "./color.js";

 const TREE_COLOR = color.green;
const LEAF_COLOR = color.darkGreen;
const SHEEP_COLOR = color.black;


 // @ts-ignore
function createTree(x, y) {
  const trunk = drawlib.rectangle(color.brown, 10, 40);
  const leaves = drawlib.circle(LEAF_COLOR, 30);
  const tree = drawlib.group([
    drawlib.move(x, y, trunk),
    drawlib.move(x, y - 40, leaves),
  ]);
  return tree;
}

// @ts-ignore
 function createSheep(x, y) {
  console.log(`Creating sheep at (${x}, ${y})`);

  const body = drawlib.circle(SHEEP_COLOR, 20);
  console.log(`Body: ${body}`);

  const head = drawlib.circle(SHEEP_COLOR, 15);
  console.log(`Head: ${head}`);

  const legs = drawlib.rectangle(color.white, 5, 20);
  console.log(`Legs: ${legs}`);

  const sheep = drawlib.group([
    drawlib.move(x, y, body),
    drawlib.move(x - 10, y - 25, head),
    drawlib.move(x - 10, y + 15, legs),
    drawlib.move(x + 10, y + 15, legs),
  ]);

  return sheep;
}

  
const tree1 = createTree(50, 150);
const tree2 = createTree(200, 150);
const tree3 = createTree(50, 250);
const tree4= createTree(200, 250);
 const sheep1 = createSheep(100, 300);
const sheep2 = createSheep(250, 300);


 
 function main() {
  const context = get2DContextById("canvas");
  drawlib.renderCentered(tree1, context);
  drawlib.renderCentered(tree2, context);
  drawlib.renderCentered(tree3, context);
  drawlib.renderCentered(tree4, context);
  drawlib.renderCentered(sheep1, context);
  drawlib.renderCentered(sheep2, context);
  
}

 main();
