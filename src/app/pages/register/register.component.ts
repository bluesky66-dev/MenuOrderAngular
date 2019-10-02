import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  commonForm;
  userRole;
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
      username: '',
      email: '',
      phone: '',
      password: '',
      role: '',
      bu_name: '',
      bu_address: '',
      com_name: '',
      com_address: '',
      dep_name: '',
      com_allowance: '',
      allow_rollover: '',
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

  onRoleChange(role) {
    console.log('userRole', role);
    this.userRole = role;
  }

  onDepChange(dep) {
    console.log('department', dep);
  }

  onComNamesChange(com_name) {
    console.log('company name', com_name);
  }

  async onSubmit(userData) {
    if (!userData.role) {
      this.toastr.error('Please select a role!');
      return false;
    }
    this.authService.register(userData);
  }
}
