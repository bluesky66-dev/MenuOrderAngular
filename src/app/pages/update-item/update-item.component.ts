import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ItemService} from '../../services/item.service';
import {ToastrService} from 'ngx-toastr';
import {Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  commonForm;
  itemData = {};
  itemId;
  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.commonForm = this.formBuilder.group({
      name: '',
      price: '',
      description: '',
      size: 'small',
      vendor: '',
    });
  }

  ngOnInit() {
    console.log('check item id');
    this.itemId = this.route.snapshot.paramMap.get('id');
    console.log('itemId', this.itemId);
    if (this.itemId) {
      this.itemService.getDetail(this.itemId);
    }
    this.itemService.onItemDetail.subscribe(data => {
      this.itemData = data;
      if (data) {
        this.commonForm.setValue({
          name: data.name,
          price: data.price,
          description: data.description,
          size: data.size,
          vendor: data.vendor,
        });
      }
    });
    this.itemService.isUpdated.subscribe(isUpdated => {
      if (isUpdated) {
        this.toastr.success('Updated menu successfully!');
      } else {
        this.toastr.error('updating menu failed!');
      }
    });
  }

  onSubmit(data) {
    // console.log('Item data', data);
    this.itemService.update(this.itemId, data);
  }
}
