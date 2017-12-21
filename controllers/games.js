const express           = require ( 'express' );
const router            = express.Router();

const Game = require('../models/games.js');
router.get("/",(req ,res) => {
  try {
    res.status( 200 ).json( {hello:"hello"} );
  } catch ( error ) {
    res.status( 400 ).json({error : err.message});
  }
});

router.get('/:id', async (req, res) => {
  try{
    const agame = await Game.findById(req.params.id);
    res.status(200).json(agame);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message});
  }
});

router.post('/', async (req, res) => {
  try{
    const agame = await Game.create({
    color: "red",
    _id: "5a3b3510dcd7051457168ca8",
    scores:{Player:{score:5,avatar:"https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_player-512.png"}}
    });
    req.session.game = agame;
    console.log(agame);
    res.status(200).json(agame);
  } catch (err) {
    console.log(err);
    res.status(400).json({err: err.message });
  }
});

router.put('/:id', async (req, res) => {

  try{

    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {new: true,set:true});
    console.log("Updated Successfully");
    console.log(updatedGame);
    res.status(200).json(updatedGame);
  } catch (e){
    console.log(e);
    res.status(400).json({err: e.message});
  }
})

router.delete('/:id', async (req, res) => {
  try{
    const agame = await
    Game.findByIdAndRemove(req.params.id);
    res.status(200).json({message: 'game removed'});
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports           = router;
