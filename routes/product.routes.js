/**
 * This file will contain the routes logic for the Product resource
*/

const productController = require("../controllers/product.controller")
const {requestValidator} = require('../middleware');
module.exports = function(app) {
    app.post("/ecomm/api/v1/products", [requestValidator.validateProductRequest], productController.create);
    app.get("/ecomm/api/v1/products", productController.findAll);
    app.get("/ecomm/api/v1/products/:id", productController.findOne);
    app.put("/ecomm/api/v1/products/:id", [requestValidator.validateProductRequest], productController.update);
    app.delete("/ecomm/api/v1/products/:id", productController.delete);
    app.get("/ecomm/api/v1/categories/:categoryId/products", productController.getProductUnderCategory)
}