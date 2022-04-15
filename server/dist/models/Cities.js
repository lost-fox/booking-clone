"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    city: { type: String },
    country: { type: String },
    image: { type: String }
});
exports.default = (0, mongoose_1.model)('Cities', schema);
//# sourceMappingURL=Cities.js.map