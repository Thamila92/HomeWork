import * as Color from "./color.js";

/**
 * @typedef { Color.Color} Color
 * 
 * The following type definition is meant to be "opaque".
 * That mean that users of `drawlib` will be able to use the `Shape` type
 * but are discouraged to build shapes directly as this representation
 * in terms of `Square/Circle/Group` might change in the future 
 * (and actually, it will! See the part 2 of the homework!)
 * 
 * Users of the lib should build the shapes with helper functions such as
 * `square`, `circle` or `group`.
 * @typedef {
 
   | {kind: "Square";color: Color;side : number; xCenter: number; yCenter:number }
   | {kind: "Circle";radius: number;color: Color; xCenter: number; yCenter: number}
   | {kind: "Group"; shapes : Array<Shape>}
   | {kind: "Polygon"; color: Color; points: Array<{ x: number; y: number }>}

   } Shape
*/

/**
 * @param {Color} color
 * @param {number} side
 * @returns {Shape}
 */
export function square(color, side) {
  return { kind: "Square", color, side, xCenter: 0, yCenter: 0 };
}

/**
 * @param {Color} color
 * @param {number} radius
 * @returns {Shape}
 */
export function circle(color, radius) {
  return { kind: "Circle", radius, color, xCenter: 0, yCenter: 0 };
}

/**
 * @param {Array<Shape>} shapes
 * @returns {Shape}
 */
export function group(shapes) {
  return { kind: "Group", shapes };
}
/**
 * @param {Color} color
 * @param {Array<{x:number; y:number}>} points
 * @returns {Shape}
 */
export function polygon(color, points) {
  return { kind: "Polygon", color, points };
}

/**
 * @param {Color} color
 * @param {number} width
 * @param {number} height
 * @returns {Shape}
 */
export function rectangle(color, width, height) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const points = [
    { x: -halfWidth, y: -halfHeight },
    { x: halfWidth, y: -halfHeight },
    { x: halfWidth, y: halfHeight },
    { x: -halfWidth, y: halfHeight },
  ];

  return { kind: "Polygon", color, points };
}

/**
 * Add `dx` and `dy` respectively to the `x` and `y` of
 * the shape. Apply this to all the sub shapes if the given one
 * is a "Group"
 * @param {number} dx
 * @param {number} dy
 * @param {Shape} shape
 * @returns {Shape}
 */
export function move(dx, dy, shape) {
  switch (shape.kind) {
    case "Square":
      return {
        ...shape,
        xCenter: shape.xCenter + dx,
        yCenter: shape.yCenter + dy,
      };
    case "Circle":
      return {
        ...shape,
        xCenter: shape.xCenter + dx,
        yCenter: shape.yCenter + dy,
      };
    case "Group":
      return {
        ...shape,
        shapes: shape.shapes.map((subShape) => move(dx, dy, subShape)),
      };
      case "Polygon":
        return {
          ...shape,
          points: shape.points.map(point => ({ x: point.x + dx, y: point.y + dy })),
        };
    default:
      throw "Unexpected! Some case is missing";
  }
}


/**
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 * @returns {void}
 */
export function renderCentered(shape, context) {
  const width = context.canvas.width;
  const height = context.canvas.height;
  render(move(width / 2, height / 2, shape), context);
}

/**
 * @param {CanvasRenderingContext2D} context
 * @param {Shape} shape
 * @returns {void}
 */
function render(shape, context) {
  switch (shape.kind) {
    case "Circle":
      renderCircle(
        shape.color,
        shape.xCenter,
        shape.yCenter,
        shape.radius,
        context
      );
      break;
    case "Square":
      renderSquare(
        shape.color,
        shape.xCenter,
        shape.yCenter,
        shape.side,
        context
      );
      break;
    case "Group":
      shape.shapes.forEach((shape) => render(shape, context));
      break;
      case "Polygon":
        renderPolygon(shape.color, shape.points, context);
        break;
    default:
      throw "Unexpected! Some case is missing";
  }
}

/**
 * @param {Color} color
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {CanvasRenderingContext2D} context
 */
function renderCircle(color, xCenter, yCenter, radius, context) {
  context.beginPath();
  context.ellipse(xCenter, yCenter, radius, radius, 0, 0, 2 * Math.PI);
  context.fillStyle = Color.render(color);
  context.fill();
}

/**
 * @param {Color} color
 * @param {Array<{x: number; y: number}>} points
 * @param {CanvasRenderingContext2D} context
 */
function renderPolygon(color, points, context) {
  const path = polygonToPath(points);
  context.fillStyle = Color.render(color);
  context.fill(path);
}
/**
 * @param {Color} color
 * @param {number} side
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {CanvasRenderingContext2D} context
 */
function renderSquare(color, xCenter, yCenter, side, context) {
  // Note: we could have used `context.rect` but the following
  // code will be more easily translatable to draw polygon
  // (see part 2 of the homework)
  const path = new Path2D();
  const halfSide = side / 2;
  path.moveTo(xCenter - halfSide, yCenter - halfSide);
  path.lineTo(xCenter + halfSide, yCenter - halfSide);
  path.lineTo(xCenter + halfSide, yCenter + halfSide);
  path.lineTo(xCenter - halfSide, yCenter + halfSide);
  path.closePath();
  context.fillStyle = Color.render(color);
  context.fill(path);
}
/**
 * @param {Array<{x:number;y:number}>} points
 * @returns {Path2D}
 */
function polygonToPath(points) {
  const path = new Path2D();
  
  if (points.length > 0) {
    const firstPoint = points[0];
    path.moveTo(firstPoint.x, firstPoint.y);

    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      path.lineTo(point.x, point.y);
    }

    path.closePath();
  }

  return path;
}
/**
 * @throws {string}
 * @returns {CanvasRenderingContext2D}
 * @param {string} id
 */
export function get2DContextById(id) {
  const canvas = document.getElementById(id);
  if (canvas === null) {
    throw `No html element with id '${id}' found`;
  }
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw "The selected element is not a canvas";
  }
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      return ctx;
    } else {
      throw "Error when getting the context";
    }
  } else {
    throw "`getContext` is not a property of the element. Please use a modern browser.";
  }
}
