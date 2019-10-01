import {EventEmitter, Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import connectToDb from '../common/db/connect';
import {AppConfig} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  isAdded: EventEmitter<boolean> = new EventEmitter();
  changedList: EventEmitter<boolean> = new EventEmitter();
  constructor(
    public backendService: BackendService,
  ) { }

  async addVendor(data) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    try {
      await mongoClient.connect();
      const db = mongoClient.db(AppConfig.DB_NAME);
      await db.collection('Vendor').insertOne(data);
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

  async listVendor(data) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    try {
      await mongoClient.connect();
      const db = mongoClient.db(AppConfig.DB_NAME);
      const docs = await db.collection('Vendor').find({}).toArray();
      mongoClient.close();
      if (docs.length > 0) {
        this.changedList.next(docs);
        this.backendService.setLoading(false);
        return true;
      } else {
        this.changedList.next(false);
        this.backendService.setLoading(false);
        return false;
      }
    } catch (e) {
      mongoClient.close();
      this.changedList.next(false);
      this.backendService.setLoading(false);
      return false;
    }
  }
}
