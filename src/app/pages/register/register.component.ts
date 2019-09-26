import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  commonForm;
  constructor(
    private ngxService: NgxUiLoaderService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.commonForm = this.formBuilder.group({
      fname: '',
      lname: '',
      email: '',
      phone: '',
      password: '',
    });
  }

  ngOnInit() {
  }

  async onSubmit(userData) {
    this.ngxService.start();
    const isRegister = await this.authService.register(userData);
    this.ngxService.stop();
    if (isRegister) {
      this.toastr.success('Register success!');
      this.router.navigate(['/login']);
    } else {
      this.toastr.error('Register failed!');
    }
  }
}
