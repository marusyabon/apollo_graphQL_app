const bcrypt = require('bcryptjs');
const User = require('../../models/users');

async function createUser (_, args, currentUser) {
    const existingUser = await User.findOne({ email: args.email });
    if (existingUser) {
        const error = new Error('User exists already!');
        throw error;
    }
    const hashedPw = await bcrypt.hash(args.password, 12);
    const user = new User({
        email: args.email,
        name: args.name,
        password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
}

module.exports = {createUser}