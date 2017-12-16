const mongoose          = require ( 'mongoose' );

const gameSchema    = mongoose.Schema({
  name          : { type: String},
});

module.exports          = mongoose.model ('Game' , gameSchema);
