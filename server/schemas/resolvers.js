const { User, Book } = require('../models');
//TODO: check if we need to require the book model
// const { Book } = require('../models');
const bookSchema = require('../models/Book');
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
        }
    },

    Mutation: {
        addSavedBook: async (parent, {title, author}) => {
            return await Book.create({title, author});
        },
        updateSavedBook: async (parent, {title, author}) => {
            return await User.findOneAndUpdate({_id: id}, {savedBook}, { new: true});
        }
    },

};

module.exports = resolvers;