import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {VendorService} from '../../services/vendor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {
  commonForm;
  constructor(
    private formBuilder: FormBuilder,
    private vendorService: VendorService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.commonForm = this.formBuilder.group({
      vname: '',
      email: '',
      tel: '',
      street: '',
      local: '',
    });
  }

  ngOnInit() {
    this.vendorService.isAdded.subscribe(addedVendor => {
      if (addedVendor) {
        this.toastr.success('Added vendor successfully!');
        this.router.navigate(['/vendor-list']);
      } else {
        this.toastr.error('Adding vendor failed!');
      }
    });
  }

  onSubmit(data) {
    this.vendorService.addVendor(data);
  }
}
