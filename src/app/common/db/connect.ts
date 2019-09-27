// jshint esversion:6
// require node packages
import {AppConfig} from '../../../environments/environment';
const MongoClient = require('mongodb').MongoClient;

export default () => {
  let url = AppConfig.DB_HOST + '://' + AppConfig.DB_USER + ':' + AppConfig.DB_PASS + '@cluster0-dvn5y.mongodb.net/' + AppConfig.DB_NAME + '?retryWrites=true/';
  if (AppConfig.environment === 'LOCAL') {
    url = 'mongodb://localhost:27017/' + AppConfig.DB_NAME + '?retryWrites=true/';
  }
  url = 'mongodb://localhost:27017/' + AppConfig.DB_NAME + '?retryWrites=true/';
  console.log('database url', url);
  return  new MongoClient(url, {useNewUrlParser: true});
};
