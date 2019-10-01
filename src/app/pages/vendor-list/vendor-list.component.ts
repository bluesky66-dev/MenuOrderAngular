import { Component, OnInit } from '@angular/core';
import {VendorService} from '../../services/vendor.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vender-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  vendorList: [];
  constructor(
    private vendorService: VendorService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.vendorService.changedList.subscribe(vendors => {
      if (vendors) {
        this.vendorList = vendors;
      } else {
      }
    });
  }


}
