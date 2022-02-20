import fetch from 'node-fetch';

const createUser = async (req, res) => {
  const { userId, userName } = req.body;

  fetch('https://api.chatengine.io/projects/people/', {
    method: 'POST',
    body: {
      username: userName,
      secret: userId,
    },
    headers: {
      CONTENT_TYPE: 'application/json',
      'PRIVATE-KEY': process.env.CHAT_ENGINE_PRIVATE_KEY,
    },
  })
    .then(apiRes => {
      res.json({
        status: 'success',
        body: apiRes.body,
        error: null,
      });
    })
    .catch(() => {
      res.json({
        status: 'error',
        body: null,
        error: 'There was an error in creating the user!',
      });
    });
};

export default createUser;
