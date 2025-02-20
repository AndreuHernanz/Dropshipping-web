//uncomment if you need to use the database
	 //const Test = require('../models/models.test')
	 const CategoriesDB = require('../models/categories')
	 const ProductsDB = require('../models/products')

class ProductsController {
	async getAllCatAllProducts (req, res){
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

	async getAllProducts (req, res){
	    try{
			const all_products = await ProductsDB.find({})
	    	res.send({ok:true,message:all_products})
	    }catch( error ){
	    	res.send({ok:false,message:error})
	    }
	}

	async addProduct (req, res){
		try{
			const { product } = req.body

			// CODE FROM POSTMAN
			/*const new_product = {
				name: product.name,
				price: parseFloat(product.price),
				image: product.image.split(", "), //split the string into an array
				stock: parseInt(product.stock),
				size: product.size.split(", "),
				color: product.color.split("/ "),
				description: product.description,
				category: product.category,
				price_id: product.price_id
			}*/
			console.log(product)
			const new_product = {
				name: product.name,
				price: parseFloat(product.price),
				image: product.image, //split the string into an array
				stock: parseInt(product.stock),
				size: product.size,
				color: product.color,
				description: product.description,
				category: product.category,
				price_id: product.price_id
			}
			console.log(new_product)
			const existingProduct = await ProductsDB.findOne({name: new_product.name})
			if (existingProduct) {
				return res.send({ ok: true, message: `Product ${new_product.name} already exists`})
			}
			else {
				const categories = await CategoriesDB.find({category: new_product.category})
				if (categories.length === 0) {
					const newCategory = await CategoriesDB.create({category: new_product.category})
				}

				await ProductsDB.create(new_product)
				return res.send({ ok: true, message: new_product})
				//return res.send({ ok: true, data: `Product ${newProduct.name} added successfully`})
			}

		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}

	async updateProduct (req, res){
		console.log(req.body)
		try{
			const { product } = req.body
			const updated_product = {
				name: product.name,
				price: parseFloat(product.price),
				image: product.image, //split the string into an array
				stock: parseInt(product.stock),//parseInt(
				size: product.size,//.split(", "),
				color: product.color,//.split("/ "),
				description: product.description,
				category: product.category,
				price_id: product.price_id
			}
			console.log(updated_product)
			const product_updated = await ProductsDB.updateOne({name:product.name}, updated_product)
			return res.send({ ok: true, message: updated_product})
		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}

	async deleteProduct (req, res){
		let {product}=req.body
		try{
			const product_deleted_name = await ProductsDB.find({name:product.name})
			if (product_deleted_name.length === 0) {
				return res.send({ ok: true, data: `Product ${product.name} not found`})
			}
			else {
				const product_deleted = await ProductsDB.deleteOne({name:product.name})
				product_deleted.deleted_item = product.name
				return res.send({ ok: true, message: product_deleted })
				//return res.send({ ok: true, data: `Product ${product.name} deleted successfully -> ${product_deleted}`})
			}
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
			res.send({ok:true,message:product_to_find})
		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}


}

module.exports = new ProductsController()