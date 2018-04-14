const redis = require('redis').createClient();

const ResponseError = require('./error').ResponseError;

redis.on('connect', () => {
  console.log('Connected to redis server');
  redis.flushall((err) => {
    if (err) {
      console.log('Unable to clear redis cache');
      console.log(err);
    } else {
      console.log('Redis cache has been cleared');
    }
  });
});

redis.on('error', (error) => {
  throw error;
});

const cacheKeys = {
  USERS: 'users',
  DRAFTS: 'drafts',
  MESSAGES: 'messages',
  SENT: 'sent',
  COUNT: 'count'
};

function cacheable(cacheKey) {
  return function(req, res, next) {
    const id = req.decoded.user.id;
    const promise = new Promise((resolve, reject) => {
      redis.hget(cacheKey, id, (err, reply) => {
        if (err) {
          reject(err);
        } else if (reply) {
          resolve(JSON.parse(reply));
        } else {
          resolve();
        }
      });
    });

    promise.then((reply) => {
      if (reply) {
        res.status(200).json(reply);
      } else {
        const response = res.send;
        res.send = function(data) {
          redis.hmset(cacheKey, id, data, (err) => {
            if (err) reject(err);
          });
          response.apply(res, arguments);
        };
        next();
      }
    })
      .catch(() => {
        res.status(500).json();
      });
  };
}

function updateCache(id, cacheKey) {
  return new Promise((resolve, reject) => {
    redis.HDEL(cacheKey, [id], (err, reply) => {
      if (err) {
        reject(new ResponseError());
      } else {
        resolve();
      }
    });
  });
}

function destroyCacheByKey(cacheKey) {
  return new Promise((resolve, reject) => {
    redis.del(cacheKey, (err, reply) => {
      if (err) {
        reject(new ResponseError());
      } else {
        resolve();
      }
    });
  });
}

function storeSocketSession(username, id) {
  redis.hmset('socket', username, id);
}

function deleteSocketSession(id) {
  redis.HGETALL('socket', (err, reply) => {
    for (const username in reply) {
      if (reply.hasOwnProperty(username)) {
        if (id === reply[username]) {
          redis.HDEL('socket', [username]);
          break;
        }
      }
    }
  });
}

function getSocketId(username) {
  return new Promise((resolve, reject) => {
    redis.HGET('socket', username, (err, reply) => {
      if (err) {
        reject(new ResponseError());
      } else {
        resolve(reply);
      }
    });
  });
}

module.exports = {
  cacheable: cacheable,
  updateCache: updateCache,
  cacheKeys: cacheKeys,
  destroyCacheByKey: destroyCacheByKey,
  storeSocketSession: storeSocketSession,
  deleteSocketSession: deleteSocketSession,
  getSocketId: getSocketId
};


