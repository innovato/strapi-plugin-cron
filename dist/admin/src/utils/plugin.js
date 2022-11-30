"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginBasePath = exports.pluginName = void 0;
const package_json_1 = __importDefault(require("../../../package.json"));
const pluginId_1 = __importDefault(require("../pluginId"));
exports.pluginName = package_json_1.default.strapi.displayName;
exports.pluginBasePath = `/plugins/${pluginId_1.default}`;
