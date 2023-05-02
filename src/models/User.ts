import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		select: false
	}
})

UserSchema.pre('save', function (next) {
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, (saltErr: Error | null, salt: string | number) => {
			if (saltErr != null) {
				next(saltErr)
			} else {
				bcrypt.hash(this.password, salt, (err: Error | null, hash: string) => {
					if (err != null) {
						next(err); return
					}

					this.password = hash
					next()
				})
			}
		})
	} else {
		next()
	}
})

UserSchema.methods.comparePassword = function (password: string, callback: (err: Error | null, isMatch: boolean | null) => void) {
	bcrypt.compare(password, this.password, function (err: Error | null, isMatch: boolean) {
		if (err != null) {
			callback(err, null); return
		}
		callback(null, isMatch)
	})
}

export default mongoose.model('User', UserSchema)
