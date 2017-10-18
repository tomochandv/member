var express = require('express')
var router = express.Router()
const config = require('./config')

// function requireUserLogin(req, res, next) {
//   const url = req.url
//   if(url.includes('.')==true || url.includes('/views/')==true || url.includes('/login')==true || url.includes('register')==true){
//     next()
//   }
//   else{
//     if(req.session.email != null){
//       next()
//     }
//     else{
//       res.render('index')
//     }
//   }
// }

// function requireadminLogin(req, res, next) {
//   const url = req.url
//   if(url.includes('.')==true || url.includes('/views/')==true || url.includes('login')==true){
//     next()
//   }
//   else{
//     if(req.session.admin != null){
//       next()
//     }
//     else{
//       res.redirect('/admin/login')
//     }
//   }
// }

module.exports = (app)=>{
  app.get('/', function(req, res) {
    res.render('index')
  })
  
  app.post('/user/loginprocess', function(req, res) {
    req.session.email = req.body.email
    res.redirect('/user/main')
  })
  
  app.get('/user/:page', function(req, res) {
    res.render('user/' + req.params.page, {url: config.domain + ':' + config.port})
  })
  
  app.get('/admin', function(req, res) {
    res.render('admin/login', {url: config.domain + ':' + config.port})
  })
  
  app.post('/admin/loginprocess', function(req, res) {
    res.render('admin/member', {url: config.domain + ':' + config.port})
  })
  
  app.get('/admin/:page',  function(req, res) {
    res.render('admin/' + req.params.page, {url: config.domain + ':' + config.port})
  })
  
  app.get('/admin/coin/:id',  function(req, res) {
    res.render('admin/coin', {url: config.domain + ':' + config.port, id:req.params.id})
  })

  app.get('/test',  function(req, res) {
    res.render('test', {url: config.domain + ':' + config.port, id:req.params.id})
  })

  app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!')
  })

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  })
  
}
// router.get('/', function(req, res) {
//   res.render('index')
// })

// router.post('/user/loginprocess', function(req, res) {
//   console.log(req.body.email)
//   req.session.key = req.body.email
//   res.redirect('/user/main')
// })

// router.get('/user/:page', requireUserLogin, function(req, res) {
//   res.render('user/' + req.params.page, {url: config.domain + ':' + config.port})
// })

// router.get('/admin', function(req, res) {
//   res.render('admin/login', {url: config.domain + ':' + config.port})
// })

// router.post('/admin/loginprocess', function(req, res) {
//   req.session.email = req.body.email
//   req.session.admin = 'coindexadmin'
//   res.render('admin/member', {url: config.domain + ':' + config.port})
// })

// router.get('/admin/:page', requireadminLogin, function(req, res) {
//   res.render('admin/' + req.params.page, {url: config.domain + ':' + config.port})
// })

// router.get('/admin/coin/:id', requireadminLogin, function(req, res) {
//   res.render('admin/coin', {url: config.domain + ':' + config.port, id:req.params.id})
// })

// module.exports = router
