import { Component, OnInit } from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AuthService} from '../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  commonForm;
  constructor(
    private ngxService: NgxUiLoaderService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.commonForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit() {
  }

  async onSubmit(userData) {
    this.ngxService.start();
    const isLoggedIn = await this.authService.login(userData);
    this.ngxService.stop();
    if (isLoggedIn) {
      this.toastr.success('Login success!');
    } else {
      this.toastr.error('Invalid email or password');
    }
  }
}
