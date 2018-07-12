import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {
  _data: any;
  discussionId: any;

  commentForm: FormGroup = new FormGroup({
    name: new FormControl(),
    comment: new FormControl()
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClientService
  ) {
    this.commentForm = fb.group({
      name: [null, Validators.required],
      comment: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('discussionId')) {
        this.discussionId = params.get('discussionId');
        this.httpClient.getDiscussion(this.discussionId).subscribe((data: any) => {
          this.data = data;
          this.discussionId = this.data._id;
          console.log(this.discussionId);
        }, (error) => {
          console.log(error);
        });
      } else {
        this.httpClient.getAllDiscussions().subscribe((data: any[]) => {
          if (data[0]) {
            this.data = data[0];
            this.discussionId = this.data._id;
            console.log(this.discussionId);
          }
        }, (error) => {
          console.log(error);
        });
      }
    });
  }

  set data(dataIn) {
    this._data = dataIn;
  }

  get data() {
    return this._data;
  }

  goToPost() {
    this.router.navigate(['discussion-post', this.discussionId]);
  }

  deleteDiscussion() {
    if (this.discussionId) {
      this.httpClient.deleteDiscussion(this.discussionId)
      .subscribe(
        (data: any) => {
        console.log(data);
        this.router.navigate(['discussion-post']);
      }, (error) => {
        console.log(error);
      });
    }
  }

  getDate(originaldDate) {
    return new Date(originaldDate).toDateString();
  }

  set_comments(post) {
    if (this.discussionId) {
      this.httpClient.updateComment(this.discussionId, post).subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
        this.commentForm.reset();
      }, (error) => {
        console.log(error);
      });
    }
  }
}
