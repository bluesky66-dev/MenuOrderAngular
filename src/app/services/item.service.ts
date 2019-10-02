import {EventEmitter, Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import connectToDb from '../common/db/connect';
import {AppConfig} from '../../environments/environment';
import * as ls from "local-storage";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  isAdded: EventEmitter<boolean> = new EventEmitter();
  changedList: EventEmitter<boolean> = new EventEmitter();

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

  async update(data) {
  }
}
