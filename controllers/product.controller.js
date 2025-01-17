const db = require('../models');
const Product = db.product;
exports.create = (req, res) => {
 

    const product = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        categoryId: req.body.categoryId
    }

    // console.log(Product)
    // res.json(product)
    Product.create(product)
    .then(category => {
        console.log(`product name: [$product.name] got inserted in the DB`)
        res.status(201).send(product);
    
    })
    .catch(err => {
        console.log(`Issue in inserting product name: [${product.name}]`)
        console.log(`Error Message : ${err.message}`)
        res.status(500).send({
            message: "Some internal error while storing the category!"
        })
    })    
  
}


exports.findAll = (req, res) => {

    let productName = req.query.name;
    let minCost = req.query.minCost; //null
    let maxCost = req.query.maxCost; //null
    let promise;

    if(productName) {
        promise = Product.findAll({
            where: {
                name: productName
            }
        })
    }else if(minCost && maxCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.gte] : minCost,
                    [Op.lte]: maxCost
                }
            }
        })
    }else if(minCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.gte] : minCost
                }
            }
        })
    }else if(maxCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.lte] : maxCost
                }
            }
        })
    }
    else{
        promise = Product.findAll();
    }
    promise
    .then(products => {
        console.log(products)

        res.status(200).send(products);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching all the products"
        })
    })
}


/**
 * Get a product based on product id
*/

exports.findOne = (req, res) => {
    const productId = req.params.id;

    Product.findByPk(productId)
    .then(product => {

        if(!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        res.status(200).send(product);
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching the product based on id"
        })
    })
}

exports.update = (req, res) => {

    const product = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost
    }

    const productId = req.params.id;

    Product.update(product, {
        where: {id: productId}
    })
    .then(updatedProduct => {
        Product.findByPk(productId)
        .then(product => {
            res.status(200).send(product);
        })
        .catch(err => {
            res.status(500).send({
                message: "Updation happened successfully, but some internal error in fetching the details"
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while updating details"
        })
    })
}

exports.delete = (req, res) => {
    const productId = req.params.id;

    Product.destroy({
        where: {id: productId}
    })
    .then(result => {
        res.status(200).send({
            message: "Successfully deleted the product"
        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Some internal error while deleting the product"
        })
    })
}


exports.getProductUnderCategory = (req, res) => {
    const categoryId = parseInt(req.params.categoryId);

    Product.findAll({
        where : {categoryId: categoryId}
    }).then(products => {
        if(products) {
            res.status(200).json(products)
        } else {
            res.status(200).json({})
        }
    }).catch(err => {
        res.status(500).send({
            message: "Some internal error while fetching products by categoryId"
        })
    })
}