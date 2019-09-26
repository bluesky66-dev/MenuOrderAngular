import {Injectable} from '@angular/core';
import connectToDb from '../common/db/connect';
import dotenv from 'dotenv';

dotenv.config();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  async login(userData) {
    const mongoClient = connectToDb();
    try {
      await mongoClient.connect();
      console.log('user login start', userData);
      const db = mongoClient.db(process.env.DB_NAME);
      const docs = await db.collection('User').find(userData ).toArray();
      console.log('user login end', docs);
      mongoClient.close();
      if (docs.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      mongoClient.close();
      return false;
    }
  }

  async register(userData) {
    const mongoClient = connectToDb();
    try {
      await mongoClient.connect();
      console.log('user insert start', userData);
      const db = mongoClient.db(process.env.DB_NAME);
      await db.collection('User').insertOne(userData);
      console.log('user inserted');
      mongoClient.close();
    } catch (e) {
      mongoClient.close();
    }
  }
}
