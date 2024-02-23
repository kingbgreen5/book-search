const { User } = require('../models/Index.js');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // me: async () => {
    //   return User.find();
    // },
  
    // profile: async (parent, { profileId }) => {
    //   return Profile.findOne({ _id: profileId });
    // },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      // console.log(context)
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },


    saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
      // Check if the user is authenitcated
      if (!context.user) {
        throw new Error('User is not authenticated');
      }
      
      try {
        // Find the user by ID
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: { bookId, authors, description, title, image, link},
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      } catch (error) {
        console.error('Error saving book:', error);
        throw new Error('Failed to save book');
      }
    },

  


        // const user = await User.findById(context.user._id);
        //     console.log(context.user)

        // if (!user) {
        //   throw new Error('User not found');
        // }

        // // Add the book to the user's savedBooks array
        // user.savedBooks.push(input);

        // // Save the updated user object
        // const updatedUser = await user.save();

        // // Return the updated user object
        // return updatedUser;








          removeBook: async (_, { bookId }, context) => {
            if (!context.user) {
              throw new AuthenticationError('You need to be logged in to perform this action');
            }
      
            try {
        
              const user = await User.findById(context.user._id);
      
              if (!user) {
                throw new Error('User not found');
              }
      
          
              user.savedBooks = user.savedBooks.filter(book => book.bookId !== bookId);
      
              // Save the updated user object
              await user.save();
      
              // Return the updated user
              return user;
            } catch (error) {
              throw new Error(`Failed to remove book: ${error.message}`);
            }
          },
        },
      };











  //   // Make it so a logged in user can only remove a skill from their own profile
  //   removeBook: async (parent, { book }, context) => {
  //     if (context.user) {
  //       return User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { savedBooks: book } },
  //         { new: true }
  //       );
  //     }
  //     throw AuthenticationError;
  //   },
  // }};

module.exports = resolvers;




    // Add a third argument to the resolver to access data in our `context`
//     saveBook: async (parent, { userId, input }, context) => {
//  // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
//       if (context.user) {
//         return User.findOneAndUpdate(
//           { userId: userId },
//           {
//             $addToSet: { savedBooks: input },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       }
//       // // If user attempts to execute this mutation and isn't logged in, throw an error
//       throw AuthenticationError;
//     },






    // // Set up mutation so a logged in user can only remove their profile and no one else's
    // removeProfile: async (parent, args, context) => {
    //   if (context.user) {
    //     return Profile.findOneAndDelete({ _id: context.user._id });
    //   }
    //   throw AuthenticationError;
    // },

      // saveBook: async (parent, { username, input}) => {
    //   // const thought = await Thought.create({ thoughtText, thoughtAuthor });

    //   await User.findOneAndUpdate(
    //     { username: username },
    //     { $addToSet: { savedBooks: input } }
    //   );

    //   return User;
    // },




