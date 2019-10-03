import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import * as ls from 'local-storage';
import date from 'date-and-time';

// @ts-ignore
const jQuery = window.jQuery;
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyOrderComponent implements OnInit {
  listData = [];
  datatable;
  userData = {};

  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

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
            return row.vendorDetail[0] && row.vendorDetail[0].username ? row.vendorDetail[0].username : '';
          }},
        {'data': 'timestamp', 'render': function (data, type, row, meta) {
            // @ts-ignore
            return row.timestamp ? date.format(new Date(row.timestamp), 'YYYY/MM/DD HH:mm:ss') : '';
          }},
      ]
    });
    // @ts-ignore
    const search = {employee: this.userData._id};
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
