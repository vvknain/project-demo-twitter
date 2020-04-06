const intialState = {
    tweets: [],
    tweet: {},
    child_tweets: [],
    is_home: true,
    user: {},
    selected_user: {}
};

export default function(state = intialState, action) {
    if (action.type == "ALL_TWEET"){
        return Object.assign({}, state, {
            tweets: action.payload
        })
    } else if (action.type == "CHILD_TWEET"){
        return Object.assign({}, state, {
            child_tweets: action.payload
        })
    } else if (action.type == "UPDATE_TWEET"){
        return Object.assign({}, state, {
            tweets: state.tweets.concat(action.payload)
        })
    } else if (action.type == "SELECTED_USER") {
        return Object.assign({}, state, {
            selected_user: action.payload
        })
    } else if(action.type == "USER_LOGIN") {
        return Object.assign({}, state, {
            user: action.payload,
            selected_user: action.payload
        })
    } else if (action.type == "SINGLE_TWEET"){
        return Object.assign({}, state, {
            tweet: action.payload
        })
    }
    return state
};