const fetch = require('node-fetch');

// @desc Authenticates Patreon user
// @route GET /auth/patreon
// access Public
exports.authUser = async (req, res, next) => {
  const incomingURL = req.url;
  const start = incomingURL.indexOf('code=');
  const end = incomingURL.indexOf('&', start);
  const code = incomingURL.substring(start + 'code='.length, end);

  const baseURL = 'https://patreon.com/api/oauth2/token?';
  const clientId = process.env.PATREON_CLIENT_ID;
  const secret = process.env.PATREON_SECRET;
  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://elvinfeng.com/auth/patreon/'
      : 'http://localhost:5000/auth/patreon/';

  async function getToken() {
    try {
      const urlToken =
        baseURL +
        'code=' +
        code +
        '&grant_type=authorization_code&client_id=' +
        clientId +
        '&client_secret=' +
        secret +
        '&redirect_uri=' +
        redirectURL;

      const resToken = await fetch(urlToken, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const json = await resToken.json();
      const token = json.access_token;

      console.log('Token ', token);

      return token;
    } catch (err) {
      console.log(err);
    }
  }

  async function getCampaign() {
    try {
      const urlCampaign =
        'https://www.patreon.com/api/oauth2/api/campaigns/' +
        process.env.PATREON_CAMPAIGN_ID +
        '/pledges?include=patron.null';
      const bearer = 'Bearer ' + process.env.PATREON_ACCESS_TOKEN;

      //console.log(url);
      //console.log(bearer);

      const resCampaign = await fetch(urlCampaign, {
        method: 'GET',
        headers: {
          Authorization: bearer,
        },
      });
      const pledges = await resCampaign.json();

      sendPledgesToDB(pledges);

      return pledges;
    } catch (err) {
      console.log(err);
    }
  }

  async function sendPledgesToDB(data) {
    const urlDB =
      'https://dota-escape-patreons.firebaseio.com/' +
      process.env.FIREBASE_KEY +
      '.json';
    
    try {
      const resDB = await fetch(urlDB, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log('Sending to DB status ', resDB.status);
    } catch (err) {
      console.log(err);
    } 
  }

  async function checkUserData() {
    try {
      const pledges = await getCampaign();
      console.log('Pledges', pledges);

      const token = await getToken();

      const urlIndentity = 'https://www.patreon.com/api/oauth2/v2/identity';
      const resUser = await fetch(urlIndentity, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      const resUserData = await resUser.json();
      const user = resUserData.data;
      console.log('User', user);

      const userPledge = pledges.data.find((pledge) => {
        //console.log(pledge.relationships.patron.data.id, user.id);
        return pledge.relationships.patron.data.id == user.id;
      });
      const userIncluded = pledges.included.find((pledge) => {
        return pledge.id == user.id;
      });
      console.log('User pledge ', userPledge);

      if (userPledge !== undefined) {
        req.session.patreonData.Id = user.id;
        req.session.patreonData.email = userIncluded.attributes.email;
        req.session.patreonData.amount = userPledge.attributes.amount_cents;
        req.session.patreonData.currency = userPledge.attributes.currency;

        req.session.isPatreonAuthed = true;
      }

      console.log('Patreon Data');
      console.log(req.session.patreonData);

      res.redirect('/patreon/');
    } catch (err) {
      console.log(err);
      res.redirect('/patreon/');
    }
  }

  checkUserData();
};

exports.getUser = async (req, res) => {
  console.log('Sending Patreon auth user info');
  req.session.patreonData = req.session.patreonData ? req.session.patreonData : {};

  if (Object.keys(req.session.patreonData).length === 0) {
    res.json(null);
  } else {
    res.json(req.session.patreonData);
  }
};
