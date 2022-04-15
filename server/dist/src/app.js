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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const user_roures_1 = __importDefault(require("../routes/user.roures"));
const cities_roures_1 = __importDefault(require("../routes/cities.roures"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = config_1.default.get("port") || 8080;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.json());
app.use("/user", user_roures_1.default);
app.use("/cities", cities_roures_1.default);
app.use("/", auth_routes_1.default);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.get("mongoUri"));
            app.get("/", (_req, res) => {
                res.send(`Hello, it"s me!`);
            });
            app.listen(PORT, () => {
                return console.log(`server is listening on ${PORT}`);
            });
        }
        catch (error) {
            console.log("Server error", error.message);
            process.exit(1);
        }
    });
}
start();
//# sourceMappingURL=app.js.map