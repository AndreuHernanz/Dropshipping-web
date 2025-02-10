//uncomment if you need to use the database
	 //const Test = require('../models/models.test')
	 const CategoriesDB = require('../models/categories')
	 const ProductsDB = require('../models/products')

class ProductsController {
	async getAllProducts (req,res){
	    try{
			const all_categories = await CategoriesDB.find({})
			const all_products = await ProductsDB.find({})

			const all = []

			for (let i = 0; i < all_categories.length; i++) {
				const category = all_categories[i].category
				const products = all_products.filter(product => product.category === category)
				all.push({category: category, products: products})
			}

			


			
	    	res.send({ok:true,message:all})
	    }catch( error ){
	    	res.send({ok:false,message:error})
	    }
	}

	async addProduct (req,res){
		try{
			const { product } = req.body
			const new_product = {
				name: product.name,
				price: parseFloat(product.price),
				color: product.color,
				description: product.description,
				category: product.category
			}
			const existingProduct = await ProductsDB.findOne({name: new_product.name})
			if (existingProduct) {
				return res.send({ ok: true, data: `Product ${new_product.name} already exists`})
			}
			else {
				await ProductsDB.create(new_product)
				return res.send({ ok: true, data: new_product})
				//return res.send({ ok: true, data: `Product ${newProduct.name} added successfully`})
			}

		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}

	async deleteProduct (req,res){
		let {product}=req.body
		try{
			const product_deleted_name = await ProductsDB.find({name:product.name})
			if (product_deleted_name.length === 0) {
				return res.send({ ok: true, data: `Product ${product.name} not found`})
			}
			else {
				const product_deleted = await ProductsDB.deleteOne({name:product.name})
				product_deleted.deleted_item = product.name
				return res.send({ ok: true, data: product_deleted })
				//return res.send({ ok: true, data: `Product ${product.name} deleted successfully -> ${product_deleted}`})
			}
		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}

	async updateProduct (req,res){
		const {old_product, new_product} = req.body
		try{
			const updated_product = await ProductsDB.updateOne(
				{name:old_product.name},
				{
					name:new_product.name, 
					price:new_product.price, 
					color:new_product.color, 
					description:new_product.description, 
					category:new_product.category
				}
			)
			res.send({ok:true,data:updated_product})
		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}

	async getProduct (req,res){
		let name = req.params.product
		try{
			const product_to_find = await ProductsDB.findOne({name:name})
			//product_to_find.item = name
			res.send({ok:true,data:product_to_find})
		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}


}

module.exports = new ProductsController()