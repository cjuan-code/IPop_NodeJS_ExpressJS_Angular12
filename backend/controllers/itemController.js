const Item = require('../models/Item');

exports.createItem = async (req, res) => {

    try {
        let item;
        item = new Item(req.body);
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    } 
}

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getItemsByCat = async (req, res) => {
    try {
        const items = await Item.find({categ: {$in: [req.params.id]}});
        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// exports.updateItem = async (req, res) => {
//     try {
//         const { name, desc, price, ubication, img, viewed, liked} = req.body;
//         let item = await Item.findById(req.params.id);

//         if (!item) {
//             res.status(404).json({ msg: "Item doesn't exists"});
//         }

//         item.name = name;
//         item.desc = desc;
//         item.price = price;
//         item.ubication = ubication;
//         item.img = img;
//         item.viewed = viewed;
//         item.liked = liked;

//         item = await Item.findOneAndUpdate({_id: req.params.id}, item, {new: true});
//         res.json(item);

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Hubo un error');
//     }
// }

exports.getItem = async (req, res) => {
    try {
        let item = await Item.find({slug: req.params.id}).populate('author', {username: 1}).populate('ubication', {ubication: 1}).populate({path: 'comment', populate: [{path: 'review'}, {path: 'author'}]});
        if (!item) {
            res.status(404).json({ msg: "Item doesn't exists"});
        }
        res.json(item);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.removeItem = async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);
        if (!item) {
            res.status(404).json({ msg: "Item doesn't exists"})
        }
        await Item.findOneAndRemove({_id: req.params.id});
        res.json({ msg: "Item removed succesfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
