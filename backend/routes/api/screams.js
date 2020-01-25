const router = require('express').Router();
const Screams = require('../../models/Screams');

// routes for www.site.com/api/screams

// get all screams
router.get('/', async function(req, res) {
    // to get all the screams
    //check for authorisation later
    //find all the screams from the db and return the values
    //assume the db to be called Screams

    Screams.find({}, function(err, res) {
        //found all the screams
        res.status(200).json(res);
    });

    res.send('hello world from /api/screams');
});

module.exports = router;
