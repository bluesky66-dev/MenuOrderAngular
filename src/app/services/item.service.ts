import {EventEmitter, Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import connectToDb from '../common/db/connect';
import {AppConfig} from '../../environments/environment';
import * as ls from 'local-storage';
const ObjectId = require('mongodb').ObjectID;

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  isAdded: EventEmitter<boolean> = new EventEmitter();
  isUpdated: EventEmitter<boolean> = new EventEmitter();
  isDeleted: EventEmitter<boolean> = new EventEmitter();
  onList: EventEmitter<any> = new EventEmitter();
  onItemDetail: EventEmitter<any> = new EventEmitter();

  constructor(
    public backendService: BackendService,
  ) {
  }

  async add(data) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    try {
      await mongoClient.connect();
      const db = mongoClient.db(AppConfig.DB_NAME);
      let userData = ls.get<string>('userData');
      userData = JSON.parse(userData);
      // @ts-ignore
      data.vendor = userData._id;
      await db.collection('Item').insertOne(data);
      mongoClient.close();
      this.backendService.setLoading(false);
      this.isAdded.next(true);
      return true;
    } catch (e) {
      mongoClient.close();
      this.isAdded.next(false);
      this.backendService.setLoading(false);
      return false;
    }
  }

  async update(id, data) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();

    try {
      await mongoClient.connect();
      const db = mongoClient.db(AppConfig.DB_NAME);
      let userData = ls.get<string>('userData');
      userData = JSON.parse(userData);

      const search = {_id: ObjectId(id)};
      // @ts-ignore
      if (userData.role === 'vendor') {
        // @ts-ignore
        // data.vendor = userData._id;
      }
      // console.log('search', search);
      const result = await db.collection('Item').updateOne(search, {$set: data});
      mongoClient.close();
      this.backendService.setLoading(false);
      if (result) {
        this.isUpdated.next(true);
      } else {
        this.isUpdated.next(false);
      }
      return true;
    } catch (e) {
      mongoClient.close();
      this.isUpdated.next(false);
      this.backendService.setLoading(false);
      return false;
    }
  }

  async delete(id) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();

    try {
      await mongoClient.connect();
      const db = mongoClient.db(AppConfig.DB_NAME);

      const search = {_id: ObjectId(id)};
      // console.log('search', search);
      const result = await db.collection('Item').deleteOne(search);
      mongoClient.close();
      this.backendService.setLoading(false);
      if (result) {
        this.isDeleted.next(true);
      } else {
        this.isDeleted.next(false);
      }
      return true;
    } catch (e) {
      mongoClient.close();
      this.isDeleted.next(false);
      this.backendService.setLoading(false);
      return false;
    }
  }

  async fetchList(page) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    let list = [];
    try {
      await mongoClient.connect();
      const db = mongoClient.db(AppConfig.DB_NAME);
      let userData = ls.get<string>('userData');
      userData = JSON.parse(userData);

      // @ts-ignore
      const search = {};
      // @ts-ignore
      if (userData.role === 'vendor') {
        // @ts-ignore
        search.vendor = userData._id;
      }
      // console.log('search', search);
      list = await db.collection('Item').find(search).toArray();
      mongoClient.close();
      this.backendService.setLoading(false);
      this.onList.next(list);
      return true;
    } catch (e) {
      mongoClient.close();
      this.onList.next(list);
      this.backendService.setLoading(false);
      return false;
    }
  }

  async getDetail(itemId) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    let itemInfo = {};
    try {
      await mongoClient.connect();
      const db = mongoClient.db(AppConfig.DB_NAME);
      let userData = ls.get<string>('userData');
      userData = JSON.parse(userData);

      // @ts-ignore
      const search = {_id: ObjectId(itemId)};
      console.log('search', search);
      const docs = await db.collection('Item').find(search).toArray();
      mongoClient.close();
      this.backendService.setLoading(false);
      if (docs) {
        itemInfo = docs[0];
      }
      this.onItemDetail.next(itemInfo);
      return true;
    } catch (e) {
      mongoClient.close();
      this.onItemDetail.next(itemInfo);
      this.backendService.setLoading(false);
      return false;
    }
  }
}
