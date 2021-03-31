const express = require('express');
const router = express.Router();
const session = require('../session');
const axios = require('axios');
const conf = require('../config')
const FormData = require('form-data')

/* GET home page. */
router.get('/', function(req, res, next) {
  const { code, state } = req.query;
  session.code = code;

  const payload = new FormData();
  payload.append('code', code)
  payload.append('client_id', conf.OIDC_CLIENT_ID)
  payload.append('client_secret', conf.OIDC_CLIENT_SECRET)
  payload.append('grant_type', "authorization_code")
  payload.append('redirect_uri', conf.OIDC_REDIRECT_URI)

  axios({
    method: 'post',
    url: `${conf.OIDC_HOST}/${conf.OIDC_BASE_URL}/token/`,
    data: payload.getBuffer(),
    headers: payload.getHeaders(),
  })
    .then(response => {
      const { id_token, access_token, refresh_token } = response.data
      session.id_token = id_token
      session.access_token = access_token
      session.refresh_token = refresh_token
      console.log(response.data)
      res.redirect('/')
    })
    .catch(err => {
      console.warn(err.response.data)
      res.send("Error! " + JSON.stringify(err.response.data));
    })
});

module.exports = router;
