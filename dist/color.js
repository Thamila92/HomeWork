"use strict";
/**
 *  @typedef {{red: number;green: number;blue: number;}} Color
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.black = exports.white = exports.darkCharcoal = exports.charcoal = exports.lightCharcoal = exports.darkGrey = exports.grey = exports.lightGrey = exports.darkRed = exports.red = exports.lightRed = exports.darkPurple = exports.purple = exports.lightPurple = exports.darkBlue = exports.blue = exports.lightBlue = exports.darkGreen = exports.green = exports.lightGreen = exports.darkBrown = exports.brown = exports.lightBrown = exports.darkOrange = exports.orange = exports.lightOrange = exports.darkYellow = exports.yellow = exports.lightYellow = void 0;
/**
 * @returns {Color}
 * @param {number} r
 * @param {number} g
 * @param {number} b
 */
function rgb(r, g, b) {
    return { red: r, green: g, blue: b };
}
exports.lightYellow = rgb(0xfc, 0xe9, 0x4f);
exports.yellow = rgb(0xed, 0xd4, 0x00);
exports.darkYellow = rgb(0xc4, 0xa0, 0x00);
exports.lightOrange = rgb(0xfc, 0xaf, 0x3e);
exports.orange = rgb(0xf5, 0x79, 0x00);
exports.darkOrange = rgb(0xce, 0x5c, 0x00);
exports.lightBrown = rgb(0xe9, 0xb9, 0x6e);
exports.brown = rgb(0xc1, 0x7d, 0x11);
exports.darkBrown = rgb(0x8f, 0x59, 0x02);
exports.lightGreen = rgb(0x8a, 0xe2, 0x34);
exports.green = rgb(0x73, 0xd2, 0x16);
exports.darkGreen = rgb(0x4e, 0x9a, 0x06);
exports.lightBlue = rgb(0x72, 0x9f, 0xcf);
exports.blue = rgb(0x34, 0x65, 0xa4);
exports.darkBlue = rgb(0x20, 0x4, 0xa87f);
exports.lightPurple = rgb(0xad, 0x7f, 0xa8);
exports.purple = rgb(0x75, 0x50, 0x7b);
exports.darkPurple = rgb(0x5c, 0x35, 0x66);
exports.lightRed = rgb(0xef, 0x29, 0x29);
exports.red = rgb(0xcc, 0x00, 0x00);
exports.darkRed = rgb(0xa4, 0x00, 0x00);
exports.lightGrey = rgb(0xee, 0xee, 0xec);
exports.grey = rgb(0xd3, 0xd7, 0xcf);
exports.darkGrey = rgb(0xba, 0xbd, 0xb6);
exports.lightCharcoal = rgb(0x88, 0x8a, 0x85);
exports.charcoal = rgb(0x55, 0x57, 0x53);
exports.darkCharcoal = rgb(0x2e, 0x34, 0x36);
exports.white = rgb(0xff, 0xff, 0xff);
exports.black = rgb(0x00, 0x00, 0x00);
/**
 * @param {Color} color
 * @returns {string}
 */
function render(color) {
    return "rgb(".concat(color.red, ", ").concat(color.green, ", ").concat(color.blue, ")");
}
exports.render = render;
