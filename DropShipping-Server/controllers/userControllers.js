//uncomment if you need to use the database
	 //const Test = require('../models/models.test')
	 //const CategoriesDB = require('../models/categories')
	 //const ProductsDB = require('../models/products')
	 const UsersDB = require('../models/users')

class UserController {
	async addUser (req,res){
		try{
			const { user } = req.body
			console.log("User from req: ", user)
			const existingEmail = await UsersDB.findOne({email: user.email})
			const existingUser = await UsersDB.findOne({name: user.name})
			if (existingEmail) {
				return res.send({ ok: false, message: `User ${user.email} already exists`})
			}				
			else if (existingUser) {
				return res.send({ ok: false, message: `User ${user.name} already exists`})
			}
			else {
				await UsersDB.create(user)
				return res.send({ ok: true, message: user})
			}
		}
		catch( error ){
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
		let nameOrEmail = req.params.user
		let password = req.params.password
		console.log("Name or Email: ", nameOrEmail)
		console.log("Password: ", password)
		try{
			const user_name_find = await UsersDB.findOne({ name: nameOrEmail})
			if (user_name_find) {
				user_name_find.password === password 
				? res.send({ ok: true, message: user_name_find}) 
				: res.send({ ok: false, message: "Incorrect password"})
			}
			else {
				const user_email_find = await UsersDB.findOne({ email: nameOrEmail})
				if (user_email_find) {
					user_email_find.password === password 
					? res.send({ ok: true, message: user_email_find}) 
					: res.send({ ok: false, message: "Incorrect password"})
				}
				else {
					res.send({ ok: false, message: "User not found"})
				}
			}
		}
		catch( error ){
			res.send({ok:false,message:error})
		}
	}

}

module.exports = new UserController()