import { model, Schema} from "mongoose";

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  surname: {type: String},
  phone: {type: String},
  favoriteHotels: [{
    hotelId: {type: String},
    image: {type:String}
  }],
  bookHotels: [{
    image: {type: String},
    name: {type: String},
    dateArrival: {type: String},
    dateDeparture: {type: String},
    days: {type: String},
    sum: {type: String},
    city: {type: String},
    address: {type: String},
    adult: {type: String},
    child: {type: String},
  }]
})

export default model('User', schema);