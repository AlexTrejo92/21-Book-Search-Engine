const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const bookSchema = require('../models/Book');

//We import the sign token for authentication
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
    //Me query holds all the information from the user, it matches the one on the typeDefs.

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!');
        },

    },
// Define the mutations that will be used on the front end to modify the data from the DB
    Mutation: {
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