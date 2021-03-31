const express = require('express');
const router = express.Router();
const conf = require('../config');

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  res.redirect(
    `${conf.OIDC_HOST}/${conf.OIDC_BASE_URL}/authorize/` +
    `?client_id=${conf.OIDC_CLIENT_ID}` +
    `&redirect_uri=${conf.OIDC_REDIRECT_URI}` +
    "&scope=openid email profile" +
    "&response_type=code"
  );
});

module.exports = router;
