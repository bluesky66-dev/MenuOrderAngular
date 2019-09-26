import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.registerForm = this.formBuilder.group({
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
    await this.authService.register(userData);
  }
}
