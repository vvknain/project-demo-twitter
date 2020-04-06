const express  = require('express');
const jwt = require('jsonwebtoken')
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressGrapghQl = require('express-graphql');  // connection between express and graphql
const schema = require('./schema/schema')
const mongo = require('mongoose')
const User = require('./models/user')
const withAuth = require('./middleware')

mongo.connect("mongodb://mongo:27017/twitter-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) {
        console.log(err)
    }
})

mongo.connection.once('open', () => {
    console.log("connected to mongodb database")
})

// instance of the app
const app = express();

app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(cookieParser())
app.use(bodyParser.json())


app.post('/login', function(req, res) {
    const {email, password} = req.body
    User.findOne({email, password}, function(err, user) {
        if (err) {
            res.status(500).json({error: 'Internal error while login'})
        } else if (!user) {
            res.status(401).json({error: 'Email or Password is incorrect'})
        } else {
            const payload = {email}
            const token = jwt.sign(payload, "twitter-demo", {expiresIn: '2h'})
            res.cookie('token', token, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).send(user)
        }
    })
})

app.post('/signup', function(req, res) {
    const {email, password} = req.body
    const user = new User({email, password, following: 0, followers: 0, tweets: 0})
    user.save(function(err, saved_user) {
        if (err) {
            res.status(500).send('Error in registering user')
        } else {
            const payload = {email}
            const token = jwt.sign(payload, "twitter-demo", {expiresIn: '2h'})
            res.cookie('token', token, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).send(saved_user)
        }
    })
})

app.get('/user', withAuth, function(req, res) {
    res.json(req.user)
})

app.get('/signout', withAuth, function(req, res) {
    res.clearCookie('token').sendStatus(200)
})

// middleware to serve connection between express and graphql
app.use('/graphql', withAuth, expressGrapghQl({
    schema,
    graphiql: true
}));

app.listen('4000', () => {
    console.log("server is running on port 4000")
})