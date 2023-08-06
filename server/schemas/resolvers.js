const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
//TODO: check if we need to require the book model
// const { Book } = require('../models');
const bookSchema = require('../models/Book');

//We import the sign token for authentication
const {signToken} = require('../utils/auth')

//TODO: Define the query and mutation functionality to work. Use the functionality in the user-controller.js as a guide.
const resolvers = {
    Query: {
        users: async () => {
            return await User.find({}).populate('books').populate(
                //TODO: Check this
                // path: 'books',
                // populate: 'title'
            );
        },
        //TODO: check if we need the books query
        books: async () => {
            return await Book.find({})
        },

        user: async (parent, {userId}) => {
            return User.findOne({_id: userId});
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    },

    Mutation: {
        // TODO: Check if we need to use context in add savedbook or updateSavedBook to see if the user need to be verified
        addSavedBook: async (parent, {title, author}) => {
            return await Book.create({title, author});
        },
        updateSavedBook: async (parent, {title, author}) => {
            return await User.findOneAndUpdate({_id: id}, {savedBook}, { new: true});
        },
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);

            return {token,user};
        },
        login: async (parent, { email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            // TODO: finish this
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }
    },

};

module.exports = resolvers;