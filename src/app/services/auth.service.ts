import {EventEmitter, Injectable} from '@angular/core';
import connectToDb from '../common/db/connect';
import {BackendService} from './backend.service';
import {AppConfig} from '../../environments/environment';

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
      console.log('user login start', userData);
      const db = mongoClient.db(AppConfig.DB_NAME);
      const docs = await db.collection('User').find(userData).toArray();
      console.log('user login end', docs);
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
      console.log('user insert start', userData);
      const db = mongoClient.db(AppConfig.DB_NAME);
      await db.collection('User').insertOne(userData);
      console.log('user inserted');
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
