// jshint esversion:6
// require node packages
import dotenv from 'dotenv';

dotenv.config();
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST + '://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@cluster0-dvn5y.mongodb.net/' +
      process.env.DB_NAME + '?retryWrites=true/', {useNewUrlParser: true});
    mongoose.set('useCreateIndex', true);
    console.log('Connected to mongo!!!');
  } catch (err) {
    console.error('Could not connect to MongoDB');
  }
};

export default connectToDb;
