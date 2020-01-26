const router = require('express').Router();
const Scream = require('../../models/Screams');
const User = require('../../models/User');
const isAuth = require('../../Middleware/isAuth');
// routes for www.site.com/api/screams

// get all screams
router.get('/', isAuth, function(req, res) {
    // to get all the screams
    //check for authorisation later
    //find all the screams from the db and return the values
    //assume the db to be called Screams

    Scream.find({}, function(err, allScreams) {
        //found all the screams
        return res.status(200).json(allScreams);
    });
});

//post a new scream
router.post('/', isAuth, async (req, res) => {
    //post a new scream to the db
    const body = req.body.body;
    try {
        const newScream = new Scream({
            body: body
        });
        newScream.save();
        User.findById(req.user.id, async function(err, foundUser) {
            if (err) throw err;
            else {
                console.log(foundUser);
                foundUser.screams.push(newScream);
                const saved = await foundUser.save();
                console.log(saved);
            }
        });
        return res
            .status(201)
            .json(`message: created new Scream with id = ${newScream._id}`);
    } catch (err) {
        console.log('error : ', err);
        return res.status(500).json(err.message);
    }
});

module.exports = router;
