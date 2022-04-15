"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String },
    phone: { type: String },
    favoriteHotels: [{
            hotelId: { type: String },
            image: { type: String }
        }],
    bookHotels: [{
            image: { type: String },
            name: { type: String },
            dateArrival: { type: String },
            dateDeparture: { type: String },
            days: { type: String },
            sum: { type: String },
            city: { type: String },
            address: { type: String },
            adult: { type: String },
            child: { type: String },
        }]
});
exports.default = (0, mongoose_1.model)('User', schema);
//# sourceMappingURL=User.js.map