const Item = require('../models/Item');
const User = require('../models/User');
const Buy = require('../models/Buy');

exports.buyItem = async (req, res) => {

    try {
        let item = await Item.findOne({slug: req.body.slug});
        if (!item) {
            res.status(404).json({ msg: "Item doesn't exists"})
        }

        let item_id = item._id;

        item.karma = item.karma + 10;

        item.save();

        await User.findById(req.payload.id).then(function(user) {
            if (!user) {
                return res.sendStatus(401);
            }

            let buy = new Buy();
            buy.item = item_id;
            buy.user = user._id
            buy.price = item.price;
            
            buy.save().then((data) => {
                data ? res.json(true) : res.json(false); 
            })

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};