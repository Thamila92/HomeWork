"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawlib = require("./drawlib.js");
var color = require("./color.js");
var TRUNK_COLOR = color.brown;
var WOOL_COLOR = color.white;
var tree = drawlib.group([
    drawlib.rectangle(TRUNK_COLOR, 20, 40), // tronc de l'arbre
    drawlib.polygon(color.green, [
        { x: -30, y: -20 },
        { x: 0, y: -60 },
        { x: 30, y: -20 },
    ]),
]);
var sheep = drawlib.group([
    drawlib.circle(WOOL_COLOR, 20), // corps du mouton
    drawlib.polygon(color.black, [
        { x: -10, y: -20 },
        { x: 10, y: -20 },
        { x: 0, y: -30 },
    ]),
]);
var scene = drawlib.group([
    drawlib.move(100, 300, tree),
    drawlib.move(200, 300, sheep),
    drawlib.move(300, 300, tree),
]);
// Fonction principale pour rendre la scène sur le canvas
function main() {
    var context = drawlib.get2DContextById("canvas");
    drawlib.renderCentered(scene, context);
}
main();
