const mongoose          = require ( 'mongoose' );

const gameSchema    = mongoose.Schema({
  color: String,
  posx: {type:Number,default:23},
  posy: {type:Number,default:23},
  scores: {}

});

module.exports          = mongoose.model ('Game' , gameSchema);
