const Review = require('../models/Review');

exports.getReviewByID = async (req, res) => {

    try {
        let review = await Review.findById(req.params.id).populate('author').populate('item');
        if (!review) {
            res.status(404).json({ msg: "Review doesn't exists"});
        }
        res.json(review);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}