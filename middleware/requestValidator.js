const db = require('../models')
const Category = db.category;
const Product = db.product;
exports.validateCategoryRequest = (req, res, next) => {
  if(!req.body.name) {
      res.status(400).json({ 
          message: `Category name can not be blank`,
          data : {}
    })
  }
 next();
}


exports.validateProductRequest = (req, res, next) => {
    if(!req.body.name) {
        res.status(400).json({
            message: 'Product name is required'
        })
    }
    if(!req.body.cost) {
        res.status(400).json({
            message: 'Cost of product is required'
        })        
    }
    if(!req.body.categoryId) {
        res.status(400).json({
            message: 'CategoryId of product is required'
        })        
    }

    Category.findByPk(req.body.categoryId).then(category => {
        if(!category) {
            res.status(400).json({
                message: 'Invalid category Id'
            })              
        }
    }).catch(err => {
        res.status(400).json({
            message: 'Invalid category Id'
        })            
    })
    next();
}


