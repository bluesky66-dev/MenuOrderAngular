// jshint esversion:6
// require node packages
import dotenv from 'dotenv';
import {AppConfig} from '../../../environments/environment';
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

export default () => {
  // let url = process.env.DB_HOST + '://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@cluster0-dvn5y.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true/';
  // if (AppConfig.environment === 'LOCAL') {
  //   url = 'mongodb://localhost:27017/' + process.env.DB_NAME + '?retryWrites=true/';
  // }
  const url = 'mongodb://localhost:27017/' + process.env.DB_NAME + '?retryWrites=true/';
  return  new MongoClient(url, {useNewUrlParser: true});
};
