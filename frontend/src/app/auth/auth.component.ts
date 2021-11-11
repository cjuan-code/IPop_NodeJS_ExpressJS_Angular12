import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType: String = '';
  title: String = '';
  isSubmitting = false;
  authForm: FormGroup;
  errors: [] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'mail': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {

    this.authType = this.router.url.slice(1, this.router.url.length);
    this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';

    if (this.authType === 'register') {
      this.authForm.addControl('username', new FormControl());
    }

    this.cd.markForCheck();
  }

  submitForm() {
    this.isSubmitting = true;

    const credentials = this.authForm.value;

    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        // console.log(err.error.msg);
        this.errors = err.error.msg;
        // console.log(this.errors);
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }
}