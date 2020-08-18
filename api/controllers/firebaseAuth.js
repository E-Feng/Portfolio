const { default: fetch } = require('node-fetch');

const tierData = {
  USD: {
    '200': 1,
    '400': 2,
    '600': 3,
    '800': 4,
    '1000': 5,
    '2000': 6,
  },
};

// @desc Authenticates Firebase user if Steam and Patreon is authed
// @route GET /firebase/
// access Public
exports.addUser = async (req, res) => {
  try {
    const isSteamAuthed = req.session.isSteamAuthed;
    const isPatreonAuthed = req.session.isPatreonAuthed;
    const steamId = req.user.id;
    const steamName = req.user.displayName;
    const email = req.session.patreonData.email;
    const amount = req.session.patreonData.amount;
    const currency = req.session.patreonData.currency;

    const tier = tierData[currency][amount];
    console.log('Tier ', tier, tier === undefined);

    if (tier === undefined) {
      console.log('Returning undefined tier error');
      return res
        .status(200)
        .json({ msg: 'Error determining tier, please message on Patreon' });
    }

    const dotaKeys = [
      process.env.DOTA_ESCAPE1_KEY,
      process.env.DOTA_ESCAPE2_KEY,
      process.env.DOTA_ESCAPE3_KEY,
    ];
    const baseURL = 'https://dota-escape-patreons.firebaseio.com/';

    if (isSteamAuthed && isPatreonAuthed) {
      const data = { level: tier, name: steamName, email: email };

      for (const key of dotaKeys) {
        const url = baseURL + key + '/patreons/' + steamId + '.json';
        console.log(url);

        const resFirebase = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        console.log('Firebase put status ', resFirebase.status);
      }
    } else {
      return res.status(200).json({ msg: 'Steam or Patreon not authorized' });
    }

    return res.status(200).json({ msg: 'Done' });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ msg: 'Error connecting to database, please try again' });
  }
};
