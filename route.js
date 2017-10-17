var express = require('express')
var router = express.Router()
const config = require('./config')

function requireUserLogin(req, res, next) {
  const url = req.url
  if(url.includes('.')==true || url.includes('/views/')==true || url.includes('/login')==true || url.includes('register')==true){
    next()
  }
  else{
    if(req.session.email != null){
      next()
    }
    else{
      res.render('index')
    }
  }
}

function requireadminLogin(req, res, next) {
  const url = req.url
  if(url.includes('.')==true || url.includes('/views/')==true || url.includes('login')==true){
    next()
  }
  else{
    if(req.session.email != null && req.session.admin != null){
      next()
    }
    else{
      res.redirect('/admin/login')
    }
  }
}

router.get('/', function(req, res) {
  res.render('index')
})

router.post('/user/loginprocess', function(req, res) {
  req.session.email = req.body.email
  res.redirect('/user/main')
})

router.get('/user/:page', requireUserLogin, function(req, res) {
  res.render('user/' + req.params.page, {url: config.domain + ':' + config.port})
})

router.get('/admin', function(req, res) {
  res.render('admin/login', {url: config.domain + ':' + config.port})
})

router.post('/admin/loginprocess', function(req, res) {
  req.session.email = req.body.email
  req.session.admin = 'coindexadmin'
  res.render('admin/member', {url: config.domain + ':' + config.port})
})

router.get('/admin/:page', requireadminLogin, function(req, res) {
  res.render('admin/' + req.params.page, {url: config.domain + ':' + config.port})
})

router.get('/admin/coin/:id', requireadminLogin, function(req, res) {
  res.render('admin/coin', {url: config.domain + ':' + config.port, id:req.params.id})
})

module.exports = router
