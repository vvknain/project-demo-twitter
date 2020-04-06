const graphql = require('graphql');
const User = require('../models/user')
const Tweet = require('../models/tweets')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        first_name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        full_name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        followers: {
            type: GraphQLInt
        },
        following: {
            type: GraphQLInt
        },
        tweets: {
            type: GraphQLInt
        }
    })
})

const TweetType = new GraphQLObjectType({
    name: 'Tweets',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        user_id: {
            type: UserType,
            resolve: (parent, args) => {
                return User.findById(parent.user_id)
            }
        },
        parent_id: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        },
        created_at: {
            type: GraphQLString
        },
        likes: {
            type: GraphQLInt
        },
        comments: {
            type: GraphQLInt
        }
    })
})

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        tweet: {
            type: TweetType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Tweet.findById(args.id)
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return User.findById(args.id)
            }
        },
        tweets: {
            type: new GraphQLList(TweetType),
            args: {
                user_id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                if (args.user_id) {
                    return Tweet.find({parent_id: {"$exists": false}, user_id: args.user_id})
                } else {
                    return Tweet.find({parent_id: {"$exists": false}})
                }
            }
        },
        child_tweets: {
            type: new GraphQLList(TweetType),
            args: {
                parent_id: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return Tweet.find({parent_id: args.parent_id})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add_tweet: {
            type: TweetType,
            args: {
                message: {
                    type: GraphQLString
                },
                user_id: {
                    type: GraphQLID
                },
                parent_id: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args, context) => {
                const add = {
                    message: args.message,
                    user_id: args.user_id
                }
                if (args.parent_id && args.parent_id != "null") {
                    add.parent_id = args.parent_id
                }
                let tweet = new Tweet(add)
                return tweet.save()
            }
        },
        update_user: {
            type: UserType,
            args: {
                first_name: {
                    type: GraphQLString
                },
                last_name: {
                    type: GraphQLString
                },
                full_name: {
                    type: GraphQLString
                },
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                update = {}
                if(args.first_name) {
                    update.first_name = args.first_name
                }
                if(args.last_name) {
                    update.last_name = args.last_name
                }
                if(args.full_name) {
                    update.full_name = args.full_name
                }
                return User.findByIdAndUpdate(args.id, update, {new: true})
            }
        },
        like_tweet: {
            type: TweetType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Tweet.findByIdAndUpdate(args.id, {$inc :{likes: 1}}, {new: true})
            }
        },
        delete_tweet: {
            type: TweetType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Tweet.deleteOne({_id: args.id})
            }
        },
        add_tweet_count: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return User.findByIdAndUpdate(args.id, {$inc: {tweets: 1}}, {new: true})
            }
        },
        subtr_tweet_count: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return User.findByIdAndUpdate(args.id, {$inc: {tweets: -1}}, {new: true})
            }
        },
        add_comment_count: {
            type: TweetType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Tweet.findByIdAndUpdate(args.id, {$inc: {comments: 1}}, {new: true})
            }
        },
        subtr_comment_count: {
            type: TweetType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Tweet.findByIdAndUpdate(args.id, {$inc: {comments: -1}}, {new: true})
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType,
    mutation: Mutation
})

module.exports = schema