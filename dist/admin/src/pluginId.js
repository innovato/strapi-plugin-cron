"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../../package.json"));
const pluginId = package_json_1.default.name.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');
exports.default = pluginId;
