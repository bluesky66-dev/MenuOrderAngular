import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemService} from '../../services/item.service';
import {Router} from '@angular/router';
import * as ls from 'local-storage';
import {OrderService} from '../../services/order.service';
import {ToastrService} from 'ngx-toastr';

// @ts-ignore
const jQuery = window.jQuery;

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemListComponent implements OnInit {
  listData = [];
  datatable;
  userData = {};

  constructor(
    private itemService: ItemService,
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
        {'data': 'name'},
        {'data': 'description'},
        {'data': 'price'},
        {'data': 'size'},
        {
          'data': null, 'render': function (data, type, row, meta) {
            // @ts-ignore
            return mainThis.userData.role && mainThis.userData.role === 'employee' ? '<a class="order-item" data-item-id="' + row._id + '" data-vendor="' + row.vendor + '">Order</a>' : '';
          }
        }
      ]
    });
    const tableBody = jQuery('#datatable tbody');
    tableBody.on('click', '.order-item', function () {
      const itemId = jQuery(this).data('item-id');
      const vendorId = jQuery(this).data('vendor');
      // console.log('itemId', itemId);
      mainThis.orderService.add(itemId, vendorId);
    });
    this.itemService.fetchList(-1);
    this.itemService.onList.subscribe(list => {
      this.listData = list;
      // console.log('listData', list);
      this.datatable.clear();
      this.datatable.rows.add(list);
      this.datatable.draw();
    });
    this.orderService.isAdded.subscribe(isAdded => {
      if (isAdded) {
        this.toastr.success('You ordered the item successfully!');
      }
    });
  }
}
