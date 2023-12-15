"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygonToPath = exports.get2DContextById = exports.polygon = exports.renderCentered = exports.move = exports.group = exports.circle = exports.rectangle = exports.square = void 0;
// Remplacez l'importation existante par ces lignes
var Color = require("./color.js");
/**
 * @typedef { Color.Color} Color
 *
 * The following type definition is meant to be "opaque".
 * That means that users of `drawlib` will be able to use the `Shape` type
 * but are discouraged to build shapes directly as this representation
 * in terms of `Square/Circle/Group` might change in the future
 * (and actually, it will! See the part 2 of the homework!)
 *
 * Users of the lib should build the shapes with helper functions such as
 * `square`, `circle` or `group`.
 /**
 * @typedef {
   | {kind: "Square"; color: Color; side: number; xCenter: number; yCenter: number }
   | {kind: "Circle"; color: Color; radius: number; xCenter: number; yCenter: number }
   | {kind: "Group"; shapes : Array<Shape>}
   | {kind: "Polygon"; color: Color; points: Array<{ x: number; y: number }>; xCenter: number; yCenter: number}
   | {kind: "Rectangle"; color: Color; width: number; height: number; xCenter: number; yCenter: number}
   } Shape
*/
/**
 * @param {Color} color
 * @param {number} side
 * @returns {Shape}
 */
function square(color, side) {
    var halfSide = side / 2;
    return { kind: "Square", color: color, side: side, xCenter: 0, yCenter: 0 };
}
exports.square = square;
/**
* @param {Color} color
* @param {number} width
* @param {number} height
* @returns {Shape}
*/
function rectangle(color, width, height) {
    return { kind: "Rectangle", color: color, width: width, height: height, xCenter: 0, yCenter: 0 };
}
exports.rectangle = rectangle;
/**
 * @param {Color} color
 * @param {number} radius
 * @returns {Shape}
 */
function circle(color, radius) {
    return { kind: "Circle", radius: radius, color: color, xCenter: 0, yCenter: 0 };
}
exports.circle = circle;
/**
 * @param {Array<Shape>} shapes
 * @returns {Shape}
 */
function group(shapes) {
    return { kind: "Group", shapes: shapes };
}
exports.group = group;
/**
 * Add `dx` and `dy` respectively to the `x` and `y` of
 * the shape. Apply this to all the sub shapes if the given one
 * is a "Group"
 * @param {number} dx
 * @param {number} dy
 * @param {Shape} shape
 * @returns {Shape}
 */
function move(dx, dy, shape) {
    switch (shape.kind) {
        case "Square":
            return __assign(__assign({}, shape), { xCenter: shape.xCenter + dx, yCenter: shape.yCenter + dy });
        case "Circle":
            return __assign(__assign({}, shape), { xCenter: shape.xCenter + dx, yCenter: shape.yCenter + dy });
        case "Polygon":
            return __assign(__assign({}, shape), { points: shape.points.map(function (point) { return (__assign(__assign({}, point), { x: point.x + dx, y: point.y + dy })); }) });
        case "Group":
            return __assign(__assign({}, shape), { shapes: shape.shapes.map(function (subShape) { return move(dx, dy, subShape); }) });
        default:
            throw "Unexpected! Some case is missing";
    }
}
exports.move = move;
/**
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 * @returns {void}
 */
function renderCentered(shape, context) {
    var width = context.canvas.width;
    var height = context.canvas.height;
    render(move(width / 2, height / 2, shape), context);
}
exports.renderCentered = renderCentered;
/**
 * @param {Color} color
 * @param {Array<{x:number; y:number}>} points
 * @returns {Shape}
 */
function polygon(color, points) {
    return { kind: "Polygon", color: color, points: points, xCenter: 0, yCenter: 0 };
}
exports.polygon = polygon;
/**
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 * @returns {void}
 */
function render(shape, context) {
    switch (shape.kind) {
        case "Circle":
            renderCircle(shape.color, shape.xCenter, shape.yCenter, shape.radius, context);
            break;
        case "Square":
            renderPolygon(shape.color, [
                { x: -shape.side / 2, y: -shape.side / 2 },
                { x: shape.side / 2, y: -shape.side / 2 },
                { x: shape.side / 2, y: shape.side / 2 },
                { x: -shape.side / 2, y: shape.side / 2 },
            ], shape.xCenter, shape.yCenter, context);
            break;
        case "Group":
            shape.shapes.forEach(function (subShape) { return render(subShape, context); });
            break;
        case "Polygon":
            renderPolygon(shape.color, shape.points, shape.xCenter, shape.yCenter, context);
            break;
        default:
            throw "Unexpected! Some case is missing";
    }
}
/**
 * @param {Color} color
 * @param {Array<{x: number; y: number}>} points
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {CanvasRenderingContext2D} context
 */
function renderPolygon(color, points, xCenter, yCenter, context) {
    var path = new Path2D();
    path.moveTo(xCenter + points[0].x, yCenter + points[0].y);
    for (var i = 1; i < points.length; i++) {
        path.lineTo(xCenter + points[i].x, yCenter + points[i].y);
    }
    path.closePath();
    context.fillStyle = Color.render(color);
    context.fill(path);
}
/**
 * @throws {string}
 * @param {string} id
 * @returns {CanvasRenderingContext2D}
 */
function get2DContextById(id) {
    var canvas = document.getElementById(id);
    if (canvas === null) {
        throw "No html element with id ".concat(id, " found");
    }
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw "The selected element is not a canvas";
    }
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        if (ctx) {
            return ctx;
        }
        else {
            throw "Error when getting the context";
        }
    }
    else {
        throw "`getContext` is not a property of the element. Please use a modern browser.";
    }
}
exports.get2DContextById = get2DContextById;
/**
 * @param {Color} color
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {CanvasRenderingContext2D} context
 */
function renderCircle(color, xCenter, yCenter, radius, context) {
    context.beginPath();
    context.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
    context.fillStyle = Color.render(color);
    context.fill();
}
/**
 * @param {Array<{x:number;y:number}>} points
 * @returns {Path2D}
 */
function polygonToPath(points) {
    var path = new Path2D();
    path.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        path.lineTo(points[i].x, points[i].y);
    }
    path.closePath();
    return path;
}
exports.polygonToPath = polygonToPath;
