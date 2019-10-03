import {EventEmitter, Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import connectToDb from '../common/db/connect';
import {AppConfig} from '../../environments/environment';
import * as ls from 'local-storage';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  isAdded: EventEmitter<boolean> = new EventEmitter();
  isUpdated: EventEmitter<boolean> = new EventEmitter();
  isDeleted: EventEmitter<boolean> = new EventEmitter();
  onList: EventEmitter<any> = new EventEmitter();
  onItemDetail: EventEmitter<any> = new EventEmitter();

  constructor(
    public backendService: BackendService,
  ) {
  }

  async add(itemId, vendorId) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    try {
      await mongoClient.connect();
      const db = mongoClient.db(AppConfig.DB_NAME);
      let userData = ls.get<string>('userData');
      userData = JSON.parse(userData);
      // @ts-ignore
      const data = {employee: userData._id, vendor: vendorId, itemId: itemId, timestamp: new Date().getTime()};
      console.log('order Data', data);
      await db.collection('Order').insertOne(data);
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

  async fetchList(search) {
    this.backendService.setLoading(true);
    const mongoClient = connectToDb();
    let list = [];
    try {
      await mongoClient.connect();
      const db = mongoClient.db(AppConfig.DB_NAME);
      let userData = ls.get<string>('userData');
      userData = JSON.parse(userData);

      // @ts-ignore
      if (userData.role === 'employee') {
        // @ts-ignore
        search.employee = userData._id;
      }
      console.log('search', search);
      list = await db.collection('Order').aggregate([
        {
          $match: search
        },
        {
          '$project': {
            timestamp: 1,
            employee: 1,
            vendor: 1,
            'itemId': {
              '$toObjectId': '$itemId'
            },
          }
        },
        {
          $lookup:
            {
              from: 'Item',
              localField: 'itemId',
              foreignField: '_id',
              as: 'itemDetail'
            }
        },
        {
          $unwind: {
            path: '$itemDetail',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          '$project': {
            timestamp: 1,
            employee: {
              '$toObjectId': '$employee',
            },
            vendor: {
              '$toObjectId': '$vendor',
            },
            itemId: 1,
            itemDetail: 1,
          }
        },
        {
          $lookup: {
            from: 'User',
            localField: 'vendor',
            foreignField: '_id',
            as: 'vendorDetail'
          }
        },
        {
          $lookup: {
            from: 'User',
            localField: 'employee',
            foreignField: '_id',
            as: 'employeeDetail'
          }
        }
      ]).toArray();
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
}
