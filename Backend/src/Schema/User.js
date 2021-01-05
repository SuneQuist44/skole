const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) { if (!validator.isEmail(value)) throw new Error('Email is not valid'); },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot be password');
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true
});

// Middlewares

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    // Private data
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Unable to login');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login');

    return user;
};

// Hash the plain text password, before saving (pre)
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);
    next();
});

userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ author: user._id });
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;