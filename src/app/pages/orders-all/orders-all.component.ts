import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderService} from '../../services/order.service';
import date from 'date-and-time';
import * as ls from "local-storage";

// @ts-ignore
const jQuery = window.jQuery;
@Component({
  selector: 'app-orders-all',
  templateUrl: './orders-all.component.html',
  styleUrls: ['./orders-all.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersAllComponent implements OnInit {
  listData = [];
  datatable;
  userData = {};
  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    const userData = ls.get<string>('userData');
    this.userData = JSON.parse(userData);
    const mainThis = this;
    this.datatable = jQuery('#datatable').DataTable({
      'data': this.listData,
      'columns': [
        {'data': 'itemDetail.name'},
        {'data': null, 'render': function (data, type, row, meta) {
            // @ts-ignore
            return row.employeeDetail[0] && row.employeeDetail[0].username ? row.employeeDetail[0].username : '';
          }},
        {'data': 'timestamp', 'render': function (data, type, row, meta) {
            // @ts-ignore
            return row.timestamp ? date.format(new Date(row.timestamp), 'YYYY/MM/DD HH:mm:ss') : '';
          }},
      ]
    });
    // @ts-ignore
    const search = {vendor: this.userData._id};
    console.log('my order search', search);
    this.orderService.fetchList(search);
    this.orderService.onList.subscribe(list => {
      console.log('my order list', list);
      this.datatable.clear();
      this.datatable.rows.add(list);
      this.datatable.draw();
    });
  }

}
