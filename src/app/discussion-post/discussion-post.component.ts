import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { environment } from '../../environments/environment.prod';
import { environment } from '../../environments/environment';
import { HttpClientService } from '../http-client.service';


@Component({
  selector: 'app-discussion-post',
  templateUrl: './discussion-post.component.html',
  styleUrls: ['./discussion-post.component.scss']
})
export class DiscussionPostComponent implements OnInit {
  discussionId;
  _data;

  postForm: FormGroup = new FormGroup({
    author: new FormControl(),
    title: new FormControl(),
    subject: new FormControl()
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClientService
  ) {
    this.postForm = fb.group({
      author : [null, Validators.required],
      title : [null, Validators.required],
      subject : [null, Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('discussionId')) {
        this.discussionId = params.get('discussionId');
        this.httpClient.getDiscussion(this.discussionId).subscribe((data: any) => {
          this.data = data;
          this.postForm.setValue({
            author: data.author,
            title: data.title,
            subject: data.subject
          });
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

  postDiscussion(post) {
    if (this.discussionId) {
      this.httpClient.updateDiscussion(this.discussionId, post).subscribe((data: any) => {
        this.router.navigate(['discussion', data]);
      }, (error) => {
        console.log(error);
      });
    } else {
      this.httpClient.createDiscussion(post).subscribe((data: any) => {
        this.router.navigate(['discussion', data]);
      }, (error) => {
        console.log(error);
      });
    }
  }
}

