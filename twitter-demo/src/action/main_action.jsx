import gql from 'graphql-tag';
import client from '../apollo_client'

export function updateTweet(payload) {
    return {
        type: "UPDATE_TWEET",
        payload
    }
}

export function singleTweet(payload) {
    return {
        type: "SINGLE_TWEET",
        payload
    }
}

export function addSelectedUser(payload) {
    return {
        type: "SELECTED_USER",
        payload
    }
}

export function allTweet(payload) {
    return {
        type: "ALL_TWEET",
        payload
    }
}

export function childTweets(payload) {
    return {
        type: "CHILD_TWEET",
        payload
    }
}

export function login_user(payload){
    return {
        type: "USER_LOGIN",
        payload
    }
}


export function requestAllTweets(data, id) {
    return function(dispatch) {
        const tweets = gql`
            {
            tweets (user_id: "${data ? id : ""}"){
                user_id {
                    id
                    full_name
                }
                message
                created_at
                likes
                comments
                id
            }
            }`
        return client.query({
                query: tweets
            }).then((result) => {
                console.log(result, "-----", typeof result)
                if (result["data"]){
                    dispatch(allTweet(result["data"]["tweets"]))
                }
            })
    }
}

export function requestChildTweets(data) {
    return function(dispatch) {
        const tweets = gql`
            {
            child_tweets(parent_id: "${data}") {
                user_id {
                    id
                    full_name
                }
                message
                created_at
                likes
                parent_id
                comments
                id
            }
            tweet(id: "${data}") {
                user_id {
                    id
                    full_name
                }
                message
                created_at
                likes
                parent_id
                comments
                id
            }
            }`
        return client.query({
                query: tweets
            }).then((result) => {
                console.log(result, "-----", typeof result)
                if (result["data"]){
                    dispatch(childTweets(result["data"]["child_tweets"]))
                    dispatch(singleTweet(result["data"]["tweet"]))
                }
            })
    }
}

export function fetchUser(data) {
    return function(dispatch) {
        const user = gql`
            {
            user(id: "${data}") {
                id
                first_name
                last_name
                full_name
                tweets
                followers
                following
            }
            }`
        return client.query({
                query: user
            }).then((result) => {
                console.log(result, "-----", typeof result)
                if (result["data"]){
                    dispatch(addSelectedUser(result["data"]["user"]))
                }
            })
    }
}

export function addTweet(data) {
    return function(dispatch) {
        let mutation_2 = ``
        if (data.parent_id) {
            mutation_2 = `
        add_comment_count(id: "${data.parent_id}"){
            id
        }
        `
        }
        let mutation = `
        mutation {
            add_tweet(user_id: "${data.user_id}", message:"${data.message}", parent_id: "${data.parent_id}"){
                user_id{
                    id
                    full_name
                }
                message
                created_at
                likes
                comments
                id
            }
            add_tweet_count(id: "${data.user_id}"){
                id
                tweets
            }
            ${mutation_2}
        }`
        const tweet = gql(mutation)
        return client.mutate({
                mutation: tweet
            }).then((result) => {
                console.log(result, "-----", typeof result)
                if (result["data"] && !data.parent_id){
                    dispatch(updateTweet(result["data"]["add_tweet"]))
                }
                window.location.reload(false)
            })
    }
}

export function updateUser(data) {
    return function(dispatch) {
        const user_update = gql`
        mutation {
            update_user(first_name: "${data.first_name}", last_name: "${data.last_name}", full_name: "${data.full_name}", id: "${data.id}") {
                id
                first_name
                last_name
                full_name
                tweets
                followers
                following
            }
        }`
        return client.mutate({
            mutation: user_update
        }).then((result) => {
            if(result["data"]) {
                const user = result["data"]["update_user"]
                user._id = user.id
                dispatch(login_user(user))
            }
        })
    }
}

export function increment_like(data) {
    return function(dispatch) {
        const like_tweet = gql`
        mutation {
            like_tweet(id: "${data}") {
                id
            }
        }`
        return client.mutate({
            mutation: like_tweet
        }).then((result) => {
            if(result["data"]) {
                // dispatch(requestAllTweets())
                console.log("sucess in liking")
                window.location.reload(false)
            }
        })
    }
}

export function deleteTweet(data, user_id) {
    return function(dispatch) {
        const delete_tweet = gql`
        mutation {
            delete_tweet(id: "${data}") {
                id
            }
            subtr_tweet_count(id: "${user_id.id}"){
                id
                tweets
            }
        }`
        return client.mutate({
            mutation: delete_tweet
        }).then((result) => {
            if(result["data"]) {
                // dispatch(requestAllTweets())
                console.log("sucess in deleting")
                window.location.reload(false)
            }
        })
    }
}