import express from 'express'
import bodyParser from 'body-parser'
import cookieparser from 'cookie-parser'
import passport from 'passport'
import expressSession from 'express-session'
import {Strategy} from 'passport-twitter'
import {serverPort, twitter} from './config/config.json'
import cors from 'cors'
import {ensureLoggedIn} from 'connect-ensure-login'
import * as db from './utils/DataBaseUtils'
import querystring from 'querystring'

db.setUpConnection()

const app = express()

passport.use(new Strategy({
  consumerKey: twitter.CONSUMER_KEY,
  consumerSecret: twitter.CONSUMER_SECRET,
  callbackURL: 'https://ing6-server-votingapp.herokuapp.com/login/twitter/return'
}, function(token, tokenSecret, profile, cb) {

  return cb(null, profile)
}))

passport.serializeUser(function(user, cb) {
  cb(null, user)
})

passport.deserializeUser(function(obj, cb) {
  cb(null, obj)
})

app.use(cookieparser('keyboard_cat'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({origin: 'https://ing6-client-votingapp.herokuapp.com', credentials: true}))

app.use(expressSession({
  secret: 'keyboard_cat',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'self' twitter.com");
    return next();
});

app.get('/', function(req, res) {
  res.send('/')
})

app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/')
  })
})

app.get('/login/twitter', passport.authenticate('twitter'))

app.get('/login/twitter/return', passport.authenticate('twitter', {failureRedirect: '/'}), function(req, res) {
  const query = querystring.stringify({"isAuth": true, "username": req.user.username, "id": req.user.id})
  res.redirect('https://ing6-client-votingapp.herokuapp.com/login/twitter/return/?' + query)
})

app.get('/auth', ensureLoggedIn('/'), function(req, res) {
  const isAuth = req.isAuthenticated()
  const username = req.user.username
  const id = req.user.id
  res.send({isAuth: isAuth, username: username, id: id})
})

app.get('/uservotes', function(req, res) {
  req.isAuthenticated()
    ? db.listUserVotes(req.user.id).then(data => res.send(data))
    : res.send({msg: "Not logged"})
})

app.get('/votes', (req, res) => {
  db.listVotes().then(data => res.send(data))
})

app.post('/remove_vote', (req, res) => {
  req.isAuthenticated()
    ? db.removeVotes(req.body.id, req.user.id).then(data => res.send(data))
    : res.send({msg: "Not logged"})
})

app.post('/createpoll', (req, res) => {
  req.isAuthenticated()
    ? db.createVote(req.user.id, req.user.username, req.body.title, req.body.options).then(data => res.send(data))
    : res.send({msg: "Not logged"})
})

app.get('/vote/:id', (req, res) => {
  db.getVoteOptions(req.params.id).then(data => res.send(data))
})

app.post('/vote_opt', (req, res) => {
  const votedBy = (req.isAuthenticated())
    ? req.user.id
    : req.ip
  db.findVoted(req.body._id, votedBy).then(data => {
    data.length
      ? res.send({msg: "You can only vote once a poll"})
      : db.voteForOption(req.body._id, req.body.option, votedBy).then(data => res.send(data))
  })
})

const server = app.listen(process.env.PORT || serverPort, () => {
  console.log(`Server running on port ${process.env.PORT || serverPort}`)
})
