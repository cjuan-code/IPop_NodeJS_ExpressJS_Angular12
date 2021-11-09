import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent {

  constructor(
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() user: any = {
    email : '',
    token: '',
    username: '',
    bio: '',
    profileImg: '',
    following: false
  };

  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;
    // TODO: remove nested subscribes, use mergeMap

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Follow this profile if we aren't already
        if (!this.user.following) {
          return this.userService.follow(this.user.username)
            .pipe(tap(data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            }, err => this.isSubmitting = false));

        // Otherwise, unfollow this profile
        } else {
          return this.userService.unfollow(this.user.username)
            .pipe(tap(data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            }, err => this.isSubmitting = false));
        }
      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }
}
