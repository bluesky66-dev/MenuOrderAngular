import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ItemService} from '../../services/item.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
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
        this.router.navigate(['/me/items']);
      } else {
        this.toastr.error('Adding item failed!');
      }
    });
  }

  onSubmit(data) {
    console.log('Item data', data);
    this.itemService.add(data);
  }
}
