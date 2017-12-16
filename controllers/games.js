const express           = require ( 'express' );
const router            = express.Router();

router.get("/",(req ,res) => {
  try {
    res.status( 200 ).json( {hello:"hello"} );
  } catch ( error ) {
    res.status( 400 ).json({error : err.message});
  }
});
module.exports           = router;
