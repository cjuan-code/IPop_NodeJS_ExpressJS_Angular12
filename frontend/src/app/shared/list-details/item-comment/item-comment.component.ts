import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Comment } from 'src/app/core/models/comment'

@Component({
  selector: 'app-item-comment',
  templateUrl: './item-comment.component.html',
  styleUrls: ['./item-comment.component.css']
})
export class ItemCommentComponent implements OnInit {

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}


  @Input() comment: any = {
    id: 0,
    content: '',
    author: {},
    createdAt: '',
    review: {}
  };

  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean = false;

  ngOnInit() {
    // Load the current user's data
    this.comment.username = this.comment.author.username;
    this.comment.profileImg = this.comment.author.profileImg;
    this.comment.valoration = this.comment.review.valoration;
    
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.username);
        this.cd.markForCheck();
      }
    );
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

}