import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  currentUser: User = {
    email: '',
    token: '',
    username: '',
    bio: '',
    profileImg: ''
  };
  count: number = 0;


  constructor(private userService: UserService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (this.count == 0) {
      this.userService.populate();
      this.count++;
    }

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }

  closeSession() {
    this.userService.purgeAuth();
  }

}
