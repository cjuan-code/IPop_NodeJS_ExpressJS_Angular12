const Category = require('../models/Category');

exports.getCategories = async (req, res) => {

    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}