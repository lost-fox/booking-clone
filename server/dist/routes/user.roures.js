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
const User_1 = __importDefault(require("../models/User"));
const userRouter = (0, express_1.Router)();
userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield User_1.default.findOne({ _id: req.params.id }, { password: 0 });
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
userRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { email, name, phone, surname } = req.body;
        const userData = yield User_1.default.updateOne({ _id: id }, { $set: { email: email, name: name, surname: surname, phone: phone } });
        if (!userData) {
            res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
userRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield User_1.default.deleteOne({ _id: id });
        res.status(200).json({ message: "user deleted" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}));
userRouter.post("/:id/bookHotels", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { image, name, dateArrival, dateDeparture, days, sum, city, address, adult, child } = req.body;
        const bookHotel = yield User_1.default.updateOne({ _id: id }, { $push: { bookHotels: { image, name, dateArrival, dateDeparture, days, sum, city, address, adult, child } } });
        res.status(200).json({ bookHotel });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}));
userRouter.patch("/:id/favorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userExist = yield User_1.default.findOne({ _id: id });
        if (!userExist) {
            res.status(404).json({ message: "user is not found" });
        }
        const { hotelId, image } = req.body;
        const favoriteHotelData = yield User_1.default.find({ _id: id, "favoriteHotels.hotelId": hotelId });
        let favoriteHotel;
        if (favoriteHotelData.length) {
            favoriteHotel = yield User_1.default.updateOne({ _id: id }, { $pull: { favoriteHotels: { hotelId, image } } });
        }
        else {
            favoriteHotel = yield User_1.default.updateOne({ _id: id }, { $push: { favoriteHotels: { hotelId, image } } });
        }
        res.status(200).json(favoriteHotelData);
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
}));
exports.default = userRouter;
//# sourceMappingURL=user.roures.js.map