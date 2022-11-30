"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginName = void 0;
const package_json_1 = __importDefault(require("../package.json"));
exports.pluginName = package_json_1.default.strapi.name;
