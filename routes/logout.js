const conf = require('../config');
const express = require('express');
const router = express.Router();
const session = require('../session')

router.get('/', function(req, res, next) {
  res.redirect(
    `${conf.OIDC_HOST}/${conf.OIDC_BASE_URL}/end-session/` +
    `?id_token_hint=${session.id_token}` +
    `&post_logout_redirect_uri=${conf.OIDC_POST_LOGOUT_REDIRECT_URI}`
  );
});

module.exports = router;
