import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemService} from '../../services/item.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

// @ts-ignore
const jQuery = window.jQuery;
@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyItemsComponent implements OnInit {
  listData = [];
  datatable;
  constructor(
    private itemService: ItemService,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    const mainThis = this;
    this.datatable = jQuery('#datatable').DataTable({
      'data': this.listData,
      'columns': [
        {'data': 'name'},
        {'data': 'description'},
        {'data': 'price'},
        {'data': 'size'},
        {'data': null, 'render': function (data, type, row, meta) { return '<a class="edit-item" data-item-id="' + row._id + '">Edit</a><a class="del-item" data-item-id="' + row._id + '">Delete</a>'; }}
      ]
    });
    const tableBody = jQuery('#datatable tbody');
    tableBody.on('click', '.edit-item', function () {
      const itemId = jQuery(this).data('item-id');
      console.log('itemId', itemId);
      mainThis.router.navigate(['/items/update/' + itemId]);
    });
    tableBody.on('click', '.del-item', function () {
      const itemId = jQuery(this).data('item-id');
      console.log('itemId', itemId);
      mainThis.itemService.delete(itemId);
    });
    this.itemService.fetchList(10);
    this.itemService.onList.subscribe(list => {
      this.listData = list;
      // console.log('listData', list);
      this.datatable.clear();
      this.datatable.rows.add(list);
      this.datatable.draw();
    });
    this.itemService.isDeleted.subscribe(isDeleted => {
      if (isDeleted) {
        this.toastr.success('Deleted menu successfully!');
      } else {
        this.toastr.error('deleting menu failed!');
      }
      window.location.reload();
    });
  }

}
