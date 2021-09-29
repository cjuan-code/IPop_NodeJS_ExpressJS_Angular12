const User = require('../models/User');

exports.getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id).populate("publishedItems");
        if (!user) {
            res.status(404).json({ msg: "User doesn't exists"});
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}