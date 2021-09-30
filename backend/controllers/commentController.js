const Comment = require('../models/Comment');

exports.getCommentByID = async (req, res) => {

    try {
        let comment = await Comment.findById(req.params.id).populate('author').populate('item');
        if (!comment) {
            res.status(404).json({ msg: "Comment doesn't exists"});
        }
        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}