import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'
import gql from 'graphql-tag';


const cache = new InMemoryCache()
const  link = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: 'include'
})

const client = new ApolloClient({
  cache,
  link
})

// const tweets = gql`
//         {
//         tweets {
//             user
//             message
//             created_at
//             likes
//             comments
//         }
//         }`

// mutation {
//   add_tweet(user_id: "2", message:"first message by himank"){
//     id
//     message 
//   }
// }

// client.query({
//   query: tweets
// }).then(result => console.log(result))

export default client
