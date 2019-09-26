import {EventEmitter, Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  isLoading: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
  ) {
  }

  setLoading(isLoading) {
    this.isLoading.next (isLoading);
  }

  showError(text, title) {
    this.toastr.success(text, title);
  }

  showSuccess(text, title) {
    this.toastr.error(text, title);
  }
}
