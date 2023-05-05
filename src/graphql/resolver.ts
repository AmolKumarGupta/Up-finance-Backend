import { Request } from "express"
import User from "../models/User";
import { type Document } from 'mongodb'
import jwt from 'jsonwebtoken'

const resolver = {
	login: async (loginInput: loginInput, req: Request) => {
		const doc: Document|null = await User.findOne({
			name: loginInput.name
		}).exec()
		
		if (doc == null) {
			throw new Error("User not found")
		}
		
		let isMatch: boolean = await doc.comparePasswordSync(loginInput.password);
		if (!isMatch) {
			throw new Error("Password do not match")
		}
		
		const token = jwt.sign(
			{ ...doc._doc, _id: doc._id.toString() },
			process.env.SECRET_KEY,
			{ expiresIn: '1h' }
		)
		
		return token
	}
}

export default resolver