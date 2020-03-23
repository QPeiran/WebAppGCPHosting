import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storePosts1: Post[] = [];
  //storePosts2: Post[] = [];
  title = 'Angular for FrontEnd';
  popAlert(){
    alert("hit me from app.component");
  }
  transPosts1(aPost: Post){
    this.storePosts1.push(aPost);
    console.log(this.storePosts1);
  }
  // transPosts2(aPost: Post){
  //   this.storePosts2.push(aPost);
  //   console.log(this.storePosts2);
  // }
  //we dont need all these event bindings when using 'service'
}
