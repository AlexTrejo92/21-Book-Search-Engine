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
    //Commented these queries as Me query is the only one we're gonna use
        /*users: async () => {
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
        },*/

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    },

    Mutation: {
        // TODO: Check if we need to use context in add saveBook or updateSavedBook to see if the user need to be verified
        //changed the name for the mutations to meet the ones defined on the typedefs
        saveBook: async (parent, { newBook }, context) => {
            console.log(context.user);
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $push: { savedBooks: newBook }},
                    { new: true }
                    );
                    console.log(updatedUser)
                    return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $pull: { savedBooks: {bookId} }},
                    { new: true }
                );
                return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);

            return {token,user};
        },
        loginUser: async (parent, { email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }


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