const validator = require('./validator');
const redis = require('redis');
let client = redis.createClient({
    port      : 18414,               // replace with your port
    host      : 'redis-18414.c16.us-east-1-3.ec2.cloud.redislabs.com',        // replace with your hostanme or IP address
    password  : 'Iy71IwDKOfDK835zYYqd19FY5d02PVKi'    // replace with your password
  });

client.on('connect', () => {
  console.log('Redis connection successfully established');
});

let getAllUsersInHash = (hashName, callback) => {
  client.HGETALL(hashName, (err, result) => {
    console.log(`Getting all the users for hash ${hashName}`);

    if(err) {
      console.log(err);
      callback(err, null);
    }
    else if(validator.isEmpty(result)) {
      console.log("online user list is empty");
      console.log(result);
      callback(null, {});
    }
    else{
      console.log(result);
      callback(null, result);
    }
  });
}

let setANewOnlineUserInHash = (hashName, key, value, callback) => {
  console.log(`setting the user ${key} with value ${value} in hash ${hashName}`);

  client.HMSET(hashName, [key, value], (err, result) => {
    if(err) {
      console.log(err);
      callback(err, null);
    }
    else {
      console.log("online user list is empty");
      console.log(result);
      callback(null, {});
    }
  });
};

let deleteUserFromHash = (hashName, key) => {
  client.HDEL(hashName, key);
  return true;
}