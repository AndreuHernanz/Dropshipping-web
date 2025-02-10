//uncomment if you need to use the database
	 //const Test = require('../models/models.test')
	 //const CategoriesDB = require('../models/categories')
	 //const ProductsDB = require('../models/products')
	 const UsersDB = require('../models/users')

class UserController {
	async addUser (req,res){
	    try{
			
	    }catch( error ){
	    	res.send({ok:false,message:error})
	    }
	}

	async deleteUser (req,res){
		try{
			

		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}

	async getUser (req,res){
		try{
			
		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}

}

module.exports = new UserController()