//uncomment if you need to use the database
	 //const Test = require('../models/models.test')
	 const CategoriesDB = require('../models/categories')
	 const ProductsDB = require('../models/products')

class CategoriesController {
	async getAllCategories (req,res){
	    try{
			const results = await CategoriesDB.find({})
	    	res.send({ ok:true, message:results })
	    }catch( error ){
	    	res.send({ ok:false, message:error })
	    }
	}

	async addCategory (req,res){
		let {category} = req.body
		try{
			const category_added = await CategoriesDB.create({category})
			res.send({ ok:true, data:category_added })
		}
		catch( error ){
			res.send({ ok:false, message:error })
		}
	}

	async deleteCategory (req,res){
		let {category} = req.body
		try{
			const deletedCategory = await CategoriesDB.deleteOne({category})
			deletedCategory.deleted_item = category
			res.send({ ok:true, data:deletedCategory })
		}
		catch( error ){
			res.send({ ok:false, data:deletedCategory })
		}
	}

	async getCategory (req,res){
		///category/:category
		let category = req.params.category
		try{
			const category_to_find = await ProductsDB.find({category:category})
			if (category_to_find.length === 0) {
				return res.send({ ok: false, message: 'Category not found' })
			}
			else {
				res.send({ ok:true, data:category_to_find })
			}
		}
		catch( error ){
			res.send({ ok:false, message:error })
		}
	}


}

module.exports = new CategoriesController()