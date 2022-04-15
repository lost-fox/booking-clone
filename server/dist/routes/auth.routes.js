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
const config_1 = __importDefault(require("config"));
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.check)("email", "Error in email").isEmail(),
    (0, express_validator_1.check)("password", "Error in password").isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array(), massage: "Error in data" });
        }
        const { email, password, name, phone, surname } = req.body;
        const candidate = yield User_1.default.findOne({ email });
        if (candidate) {
            return res.status(400).json({ massage: "Person exist!" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const user = new User_1.default({ email, password: hashedPassword, name, phone, surname });
        yield user.save();
        res.status(201).json({ message: "creating user accounts" });
    }
    catch (e) {
        res.status(500).json({ message: e });
    }
}));
router.post("/login", [
    (0, express_validator_1.check)("email", "Please enter a valid email address")
        .normalizeEmail()
        .isEmail(),
    (0, express_validator_1.check)("password", "Please enter a valid password").exists(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array(), massage: "ko-ko-ko-ko" });
        }
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ massage: "User is not found" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrond password. Try again" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.get("jwtSecret"), {
            expiresIn: "1h",
        });
        res.json({ token, userId: user.id });
    }
    catch (e) {
        res.status(500).json({ message: "Error. Try again" });
    }
}));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map