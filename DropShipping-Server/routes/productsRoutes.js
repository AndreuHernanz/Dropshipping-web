const router = require('express').Router()
     const controller = require('../controllers/productControllers')
     router.get('/',controller.getAllCatAllProducts)
     router.post('/add',controller.addProduct)
     router.post('/delete',controller.deleteProduct)
     router.get('/all',controller.getAllProducts)
     router.get('/:product',controller.getProduct)

     module.exports = router


/*
| Method | URL                   | Action                                      |
| ------ | --------------------  | ------------------------------------------- |
| POST   | /category/add         | Add a new category to DB                    |
| POST   | /category/delete      | Remove category from DB                     |
| GET    | /category/categories  | Get all categories                          |
| GET    | /category/:category   | Get all products from one category          |
 
| POST   | /product/add          | Add new product to DB                       |
| POST   | /product/delete       | Delete product from DB                      |
| GET    | /product/             | display all categories with all products    |
| GET    | /product/all          | display all products                        |
| GET    | /product/:product     | Get one product by passing name in the body |
 
| POST   | /user/add             | Add a new user to DB                        |
| POST   | /user/delete          | Remove user from DB                         |
| GET    | /user/:user/:password | Get if true                                 |*/