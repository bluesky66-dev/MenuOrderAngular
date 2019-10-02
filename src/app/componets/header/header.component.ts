import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import * as ls from 'local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userData = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(checkLogin => {
      console.log('user logged in', checkLogin);
      this.isLoggedIn = checkLogin;
      if (checkLogin) {
        this.toastr.success('Login success!');
        const userData = ls.get<string>('userData');
        this.userData = JSON.parse(userData);
        console.log('this.userData', this.userData);
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Invalid email or password!');
      }
    });
  }
}
