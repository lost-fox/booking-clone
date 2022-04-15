import { model, Schema } from "mongoose";

const schema = new Schema({
  city: {type: String},
  country: {type: String},
  image: {type: String}
})

export default model('Cities', schema);
