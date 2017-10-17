const crypto = require('crypto')

exports.Encription = (text =>{
  const cipher = crypto.createCipher('aes-256-cbc', 'coindex213456!@')
  let result = cipher.update(text, 'utf8', 'base64')
  result += cipher.final('base64')
  return result
})

exports.Decription = (text => {
  const decipher = crypto.createDecipher('aes-256-cbc', 'coindex213456!@')
  let result = decipher.update(text, 'base64', 'utf8')
  result += decipher.final('utf8')
  return result
})