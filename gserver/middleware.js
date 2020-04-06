const jwt = require('jsonwebtoken')
const User = require('./models/user')

const withAuth = function(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        res.status(401).send('Unauthorized: No token provided')
    } else {
        jwt.verify(token, "twitter-demo", function(err, decoded){
            if (err) {
                res.status(500).send('Unauthorized: Invalid Token provided')
            } else {
                User.findOne({email: decoded.email}, (err, user) => {
                    req.user = user
                    next()
                })
            }
        })
    }
}

module.exports = withAuth