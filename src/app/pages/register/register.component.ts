import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
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
      role: '',
    });
  }

  ngOnInit() {
    this.authService.isRegister.subscribe(isRegister => {
      if (isRegister) {
        this.toastr.success('Register success!');
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Register failed!');
      }
    });
  }

  async onSubmit(userData) {
    this.authService.register(userData);
  }
}
