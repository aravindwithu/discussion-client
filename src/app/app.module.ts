import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { DiscussionPostComponent } from './discussion-post/discussion-post.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientService } from './http-client.service';

const rootConfig = [
  { path: '', component: DiscussionComponent},
  { path: 'discussion', component: DiscussionComponent},
  { path: 'discussion/:discussionId', component: DiscussionComponent},
  { path: 'discussion-post', component: DiscussionPostComponent},
  { path: 'discussion-post/:discussionId', component: DiscussionPostComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DiscussionComponent,
    DiscussionPostComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootConfig),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
