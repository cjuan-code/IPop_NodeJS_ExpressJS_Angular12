const User = require('../models/User');

exports.loadUser = async (req, res) => {

    try {
        let user = await User.findById(req.payload.id).populate("publishedItems");
        if (!user) {
            res.status(404).json({ msg: "User doesn't exists"});
        }
        res.json({user: user.toAuthJSON()});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.login = async (req, res) => {    
    try {
        let user = await User.findOne({mail: req.body.user.mail}).populate("publishedItems");

        if (!user) {
            return res.status(404).json({ msg: "User doesn't exists"});
        } else {

            if (user.validPassword(req.body.user.password)) {
                return res.json({user: user.toAuthJSON()});
            } else {
                return res.status(404).json({ msg: "Pass don't match"});
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.register = async (req, res, next) => {
    var user = new User();

    user.username = req.body.user.username;
    user.mail = req.body.user.mail;
    user.setPass(req.body.user.password);
    user.ubication = req.body.user.ubication;

    user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
}

exports.updateUser = async (req, res, next) => {

    let user = await User.findById(req.payload.id);

    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
        user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
        user.mail = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
        user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
        user.profileImg = req.body.user.image;
    }

    if(typeof req.body.user.password !== 'undefined'){
        user.setPass(req.body.user.password);
    }

    user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
    });

}