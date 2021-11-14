const Item = require('../models/Item');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Review = require('../models/Review');

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
        const items = await Item.find().sort({'karma': 'desc'});
        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getItemsPag = async (req, res) => {
    try {

        if (req.query.categ == 'all') {

            if (req.query.search) {
                const items = await Item.find({name: {$regex: req.query.search}}).skip(Number(req.query.offset) | 0).limit(Number(req.query.limit) | 3).sort({'karma': 'desc'});
                res.json(items);
            } else if (req.query.filtering == 'true') {

                var items = await Item.find().sort({'karma': 'desc'});
                items = items.filter((dataa) => dataa.categ.includes(req.query.category) || JSON.stringify(dataa.shipping) == req.query.shipping);
                items = items.splice(req.query.offset, req.query.limit);
                
                res.json(items);
                
            } else {
                const items = await Item.find().skip(Number(req.query.offset) | 0).limit(Number(req.query.limit) | 3).sort({'karma': 'desc'});
                res.json(items);
            }
        } else {
            const items = await Item.find({categ: {$in: [req.query.categ]}}).skip(Number(req.query.offset) | 0).limit(Number(req.query.limit) | 3).sort({'karma': 'desc'});
            res.json(items);
        }

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
        let item = await Item.findOne({slug: req.params.id}).populate('author', {username: 1}).populate('ubication', {ubication: 1}).populate({path: 'comment', populate: [{path: 'author', select: 'username profileImg'}, {path: 'review'}]});
    
        if (!item) {
            res.status(404).json({ msg: "Item doesn't exists"})
        }

        if (req.payload) {
            await User.findById(req.payload.id).then(function(user) {
                if (!user) {
                    return res.sendStatus(401);
                }
    
                return res.json(item.toJSONfor(user));
    
            });
        } else {
            return res.json(item.toJSONfor());
        }
        
        
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

exports.favorite = async (req, res) => {
    try {
        let item = await Item.findOne({slug: req.body.slug}).populate('author', {username: 1}).populate('ubication', {ubication: 1}).populate({path: 'comment', populate: [{path: 'author', select: 'username profileImg'}, {path: 'review'}]});
        if (!item) {
            res.status(404).json({ msg: "Item doesn't exists"})
        }

        let item_id = item._id;

        item.karma = item.karma + 4;

        await User.findById(req.payload.id).then(function(user) {
            if (!user) {
                return res.sendStatus(401);
            }

            return user.favorite(item_id).then(function() {
                return item.updateFavoriteCount().then(function(item) {
                    return res.json({item: item.toJSONfor(user)});
                });
            });
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.unfavorite = async (req, res) => {
    try {
        let item = await Item.findOne({slug: req.params.slug}).populate('author', {username: 1}).populate('ubication', {ubication: 1}).populate({path: 'comment', populate: [{path: 'author', select: 'username profileImg'}, {path: 'review'}]});
        if (!item) {
            res.status(404).json({ msg: "Item doesn't exists"})
        }

        let item_id = item._id;

        item.karma = item.karma - 4;

        await User.findById(req.payload.id).then(function(user) {
            if (!user) {
                return res.sendStatus(401);
            }

            return user.unfavorite(item_id).then(function() {
                return item.updateFavoriteCount().then(function(item) {
                    return res.json({item: item.toJSONfor(user)});
                });
            });
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.createComment = async (req, res) => {

    try {
        var item = await Item.findOne({slug: req.body.comment.slug}).populate('author', {username: 1}).populate('ubication', {ubication: 1}).populate({path: 'comment', populate: {path: 'author'}});
        if (!item) {
            res.status(404).json({ msg: "Item doesn't exists"})
        }


        item.karma = item.karma + (3 + (req.body.comment.valoration * 6));

        await User.findById(req.payload.id).then((user) => {
            if (!user) {
                return res.sendStatus(401);
            }

            if (req.body.comment.content == null) {
                return res.status(404).json({ msg: "Empty comment"});
            }        

            let review = new Review();
            review.valoration = Number(req.body.comment.valoration);

            let comment = new Comment();
            comment.content = req.body.comment.content;
            comment.author = user._id;
            comment.review = review._id;

            review.save();
            comment.save();

            item.comment.push(comment._id);

            item.save().then(async () => {
                var item2 = await Item.findOne({slug: req.body.comment.slug}).populate('author', {username: 1}).populate('ubication', {ubication: 1}).populate({path: 'comment', populate: [{path: 'author', select: 'username profileImg'}, {path: 'review'}]});
            
                res.json(item2.toJSONfor(user));
            });
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteComment = async (req, res) => {

    try {
        var item = await Item.findOne({slug: req.params.slug});
        if (!item) {
            res.status(404).json({ msg: "Item doesn't exists"})
        }

        let rev = await Review.findOne({_id: req.params.reviewId});


        item.karma = item.karma - (3 + (rev.valoration * 6));


        await User.findById(req.payload.id).then(async (user) => {
            if (!user) {
                return res.sendStatus(401);
            }
        
            await Review.findOneAndRemove({_id: req.params.reviewId});

            let position = item.comment.indexOf(req.params.commentId);

            item.comment.splice(position, 1);

            await Comment.findOneAndRemove({_id: req.params.commentId});

            item.save().then(async () => {
                var item2 = await Item.findOne({slug: req.params.slug}).populate('author', {username: 1}).populate('ubication', {ubication: 1}).populate({path: 'comment', populate: [{path: 'author', select: 'username profileImg'}, {path: 'review'}]});
            
                res.json(item2.toJSONfor(user));
            });
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}