const router = require('express').Router();
const Screams = require('../../models/Screams');

// routes for www.site.com/api/screams

// get all screams
router.get('/', function(req, res) {
    // to get all the screams
    //check for authorisation later
    //find all the screams from the db and return the values
    //assume the db to be called Screams

    Screams.find({}, function(err, allScreams) {
        //found all the screams
        return res.status(200).json(allScreams);
    });
});

router.post('/', async (req, res) => {
    //post a new scream to the db
    const newScream = {
        userHandle: req.body.userHandle,
        body: req.body.body
    };
    try {
        const Scream = await Screams.create(newScream);
        return res
            .status(201)
            .json(`message: created new Scream with id = ${Scream._id}`);
    } catch (err) {
        console.log('error : ', err);
        return res
            .status(500)
            .json('message: server error. Could not create Scream');
    }
});

module.exports = router;
