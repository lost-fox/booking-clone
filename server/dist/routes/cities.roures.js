"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cities_1 = __importDefault(require("../models/Cities"));
const citiesRouter = (0, express_1.Router)();
citiesRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const citiesData = yield Cities_1.default.aggregate([{ $sample: { size: 5 } }]);
        if (!citiesData) {
            res.status(404).json({ message: "Cities not found" });
        }
        res.status(200).json(citiesData);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = citiesRouter;
//# sourceMappingURL=cities.roures.js.map