const router = require('express').Router()
     const controller = require('../controllers/categoryControllers')
     router.get('/categories',controller.getAllCategories)
     router.post('/add',controller.addCategory)
     router.post('/delete',controller.deleteCategory)
     router.get('/:category',controller.getCategory)

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