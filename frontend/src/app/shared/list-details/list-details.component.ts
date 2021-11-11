import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from 'src/app/core/models/item';
import { User } from 'src/app/core/models/user';
import { CommentsService } from 'src/app/core/services/comments.service';
import ItemService from 'src/app/core/services/item.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {

  @Input() slug_item = '';

  itemInfo: any = {
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
  currentUser: any = {};
  canModify: boolean = false;
  commentControl = new FormControl();
  commentFormErrors: Array<string> = [];
  isSubmitting = false;
  isDeleting = false;
  newCommentReview: Number = 0;

  constructor(private _itemService: ItemService, private commentsService: CommentsService, private userService: UserService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this._itemService.getItem(this.slug_item).subscribe(data => {
      this.itemInfo = data;
      this.userService.currentUser.subscribe(data => {
        this.itemInfo.author.following = (data.following.includes(this.itemInfo.author._id));
      })
      console.log(this.itemInfo);
    }, error => {
      console.log(error);
    })
  }

  onToggleFavorite(favorited: boolean) {
    this.itemInfo.isLiked = favorited;

    if (favorited) {
      this.itemInfo.liked++;
    } else {
      this.itemInfo.liked--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.itemInfo.author.following = following;
  }

  onToggleReview(value: Number) {
    this.newCommentReview = value;
  }

  addComment(e: any) {
    e.preventDefault();

    this.isSubmitting = true;
    this.commentFormErrors = [];

    const commentBody = this.commentControl.value;

    if (commentBody == null) {
      this.commentFormErrors = ["Content can't be blank"];
      this.isSubmitting = false;
    } else {
      this.commentsService
      .add(this.itemInfo.slug, commentBody, this.newCommentReview)
      .subscribe(
        data => {
          this.itemInfo = data;
          this.commentControl.reset('');
          this.newCommentReview = 0;
          this.isSubmitting = false;
          this.cd.markForCheck();
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors.error.msg;
          this.cd.markForCheck();
        }
      );
    }
  }

  onDeleteComment(comment: any) {

    console.log(comment);
    
    // per a que funcionara la request i entrara al interceptor he degut d'afegir el subscribe
    this.commentsService.remove(comment._id, this.itemInfo.slug, comment.review._id).subscribe(data => {
      this.itemInfo = data;
    });
  }
}
