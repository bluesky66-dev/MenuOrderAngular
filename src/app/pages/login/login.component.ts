import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  commonForm;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.commonForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit() {
  }

  onSubmit(userData) {
    this.authService.login(userData);
  }
}
