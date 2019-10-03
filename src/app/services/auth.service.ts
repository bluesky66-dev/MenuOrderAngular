import {EventEmitter, Injectable} from '@angular/core';
import connectToDb from '../common/db/connect';
import {BackendService} from './backend.service';
import {AppConfig} from '../../environments/environment';
const ObjectId = require('mongodb').ObjectID;
import * as ls from 'local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: EventEmitter<boolean> = new EventEmitter();
  isRegister: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public backendService: BackendService,
  ) {
  }

  async login(userData) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    try {
      await mongoClient.connect();
      // console.log('user login start', userData);
      const db = mongoClient.db(AppConfig.DB_NAME);
      const docs = await db.collection('User').find(userData).toArray();
      // console.log('user login end', docs);
      mongoClient.close();
      if (docs.length > 0) {
        ls.set('userData', JSON.stringify(docs[0]));
        this.isLoggedIn.next(true);
        this.backendService.setLoading(false);
        return true;
      } else {
        this.isLoggedIn.next(false);
        this.backendService.setLoading(false);
        return false;
      }
    } catch (e) {
      mongoClient.close();
      this.isLoggedIn.next(false);
      this.backendService.setLoading(false);
      return false;
    }
  }

  async fetchDetail(userId) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    try {
      await mongoClient.connect();
      // console.log('user login start', userData);
      const db = mongoClient.db(AppConfig.DB_NAME);
      const search = {_id: ObjectId(userId)};
      const docs = await db.collection('User').find(search).toArray();
      // console.log('user login end', docs);
      mongoClient.close();
      if (docs.length > 0) {
        ls.set('userData', JSON.stringify(docs[0]));
        this.isLoggedIn.next(true);
        this.backendService.setLoading(false);
        return true;
      } else {
        this.isLoggedIn.next(false);
        this.backendService.setLoading(false);
        return false;
      }
    } catch (e) {
      mongoClient.close();
      this.isLoggedIn.next(false);
      this.backendService.setLoading(false);
      return false;
    }
  }

  async register(userData) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    try {
      await mongoClient.connect();

      switch (userData.role) {
        case 'vendor':
          delete userData.com_name;
          delete userData.com_address;
          delete userData.dep_name;
          delete userData.com_allowance;
          delete userData.allow_rollover;
          break;
        case 'employee':
          delete userData.bu_name;
          delete userData.bu_address;
          delete userData.com_allowance;
          delete userData.allow_rollover;
          break;
        case 'ambassador':
          delete userData.bu_name;
          delete userData.bu_address;
          break;
      }
      const db = mongoClient.db(AppConfig.DB_NAME);
      const cResult = await db.collection('User').insertOne(userData);
      if (cResult) {
      }
      // console.log('user inserted', cResult.insertedId.toString());
      mongoClient.close();
      this.backendService.setLoading(false);
      this.isRegister.next(true);
      return true;
    } catch (e) {
      mongoClient.close();
      this.isRegister.next(false);
      this.backendService.setLoading(false);
      return false;
    }
  }
}
