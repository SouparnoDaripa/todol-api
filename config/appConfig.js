let appConfig = {};

appConfig.port = 3002;
appConfig.allowCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/todolDb'
}
appConfig.apiVersion = '/api/v1';
appConfig.timezone = 'Asia/Calcutta';

module.exports = {
    port: appConfig.port,
    allowCorsOrigin: appConfig.allowCorsOrigin,
    env: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}