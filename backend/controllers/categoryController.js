const Category = require('../models/Category');

exports.getCategories = async (req, res) => {

    try {
        const categories = await Category.find().skip(Number(req.query.offset) | 0).limit(Number(req.query.limit) | 2);
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}