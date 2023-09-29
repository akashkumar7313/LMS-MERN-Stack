import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    fullName: {
        type: 'string',
        required: [true, 'Name is required'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: 'string',
        required: [true, 'Name is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ], // Matches email against regex
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false, // Will not select password upon looking up a document
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,

}, {
    timestamps: true,
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next;
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods = {
    genereteJWTToken : async function(){
        return await jwt.sign(
            {id: this.id, email: this.email, subscription: this.subscription},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        )
    }
}

const User = model('User', userSchema);

export default User;