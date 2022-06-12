const categoryController = require('../controllers/category.controller');
const {requestValidator} = require('../middleware');
module.exports = (app) => {

    // Route to create category
    app.post('/ecomm/api/v1/categories',[requestValidator.validateCategoryRequest], categoryController.create);

    //Router to fetch all the categories
    app.get('/ecomm/api/v1/categories', categoryController.findAll);

    //Route to fetch category base on category index
    app.get('/ecomm/api/v1/categories/:id', categoryController.findOne);

    //Route to update category on category id
    app.put('/ecomm/api/v1/categories/:id',[requestValidator.validateCategoryRequest], categoryController.update);

    //Route to delete category on category id
    app.delete('/ecomm/api/v1/categories/:id', categoryController.delete);
} 