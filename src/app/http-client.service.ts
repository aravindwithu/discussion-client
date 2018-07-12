import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Discussion } from './models/discussionModel';
import { Comment } from './models/commentModel';


@Injectable()
export class HttpClientService {

  constructor(
    private http: HttpClient
  ) { }

  getAllDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>('http://localhost:8080/discussions/');
  }

  getDiscussion(discussionId): Observable<Discussion> {
    return this.http.get<Discussion>('http://localhost:8080/discussions/' + discussionId);
  }

  createDiscussion(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/discussions', data);
  }

  updateDiscussion(discussionId, data): Observable<any> {
    return this.http.put<any>('http://localhost:8080/discussions/' + discussionId, data);
  }

  deleteDiscussion(discussionId): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/discussions/' + discussionId);
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:8080/comments/');
  }

  getComment(commentId): Observable<Comment> {
    return this.http.get<Comment>('http://localhost:8080/comments/' + commentId);
  }

  createComment(data): Observable<Comment> {
    return this.http.post<Comment>('http://localhost:8080/comments', data);
  }

  updateComment(discussionId, data): Observable<any> {
    return this.http.put<any>('http://localhost:8080/comments/' + discussionId, data);
  }

  deleteComment(commentId): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/comments/' + commentId);
  }
}
