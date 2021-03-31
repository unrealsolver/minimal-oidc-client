var express = require('express');
var router = express.Router();
const session = require('../session')
const conf = require('../config')
const axios = require('axios')

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const response = await axios.get(`${conf.OIDC_HOST}/${conf.OIDC_BASE_URL}/userinfo` +
      `?access_token=${session.access_token}`
    )
    const profile = response.data
    console.log(profile)
    res.render('index', { title: 'Profile', profile });
  } catch(e) {
    res.send('Error')
  }
});

module.exports = router;
