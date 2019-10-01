import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ItemService} from '../../services/item.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  commonForm;
  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private toastr: ToastrService,
    private router: Router,
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
    this.itemService.isAdded.subscribe(isAdded => {
      if (isAdded) {
        this.toastr.success('Added menu successfully!');
        this.router.navigate(['/item-list']);
      } else {
        this.toastr.error('Adding item failed!');
      }
    });
  }

  onSubmit(data) {
    console.log('Item data', data);
    this.itemService.update(data);
  }
}
