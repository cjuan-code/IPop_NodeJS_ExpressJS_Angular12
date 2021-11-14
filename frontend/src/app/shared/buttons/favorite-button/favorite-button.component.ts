import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from 'src/app/core/models/item';
import ItemService from 'src/app/core/services/item.service';
import { UserService } from 'src/app/core/services/user.service';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent {

  @Input() item: Item = {
    slug: '', 
    name: '',
    desc: '',
    price: 0,
    categ: [''],
    ubication: {ubication: ''},
    liked: 0,
    isLiked: false,
    viewed: 0,
    comment: [''],
    author: {username: '', bio: '', profileImg: '', following: false},
    wear: '',
    state: '',
    shipping: false,
    img: ['']
  };
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(private _itemService: ItemService, private router: Router, private _userService: UserService, private cd: ChangeDetectorRef, private notifyService: NotificationService) { }

  toggleFavorite() {
    this.isSubmitting = true;

    this._userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the article if it isn't favorited yet
        if (!this.item.isLiked) {
          return this._itemService.favorite(this.item.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
              this.notifyService.showInfo('Has dado like al articulo', '');
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfavorite the article
        } else {
          return this._itemService.unfavorite(this.item.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
              this.notifyService.showInfo('Has quitado el like al articulo', '');
            },
            err => this.isSubmitting = false
          ));
        }

      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }

}
