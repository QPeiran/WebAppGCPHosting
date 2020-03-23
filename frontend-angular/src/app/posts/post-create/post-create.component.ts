import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model'
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/posts.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  yigePost = "Dummy";
  lianggePost = "oldPost";
  @Output() ceatingPostEvent1 = new EventEmitter<Post>();
  //@Output() ceatingPostEvent2 = new EventEmitter<Post>();

  constructor(public aPostServiceInstance: PostService) {}

  enterTitle = "errorT";
  enterContent = "errorC";
  onAddPost(input: HTMLTextAreaElement){
    console.dir(input);
    alert("Data Saved! (form post-create.component)");
    this.yigePost = input.value;
}////////////////////clicking the "Save Data"//////////
  onAddNewPost(){
    const posting: Post = {
      title : this.enterTitle,
      content : this.enterContent
    }
    //console.log(posting);
    // var title = this.enterTitle;
    // var content = this.enterContent;
     console.log(posting.title);
     console.log(posting.content);
    this.ceatingPostEvent1.emit(posting); //emiting event that contains 'posting'
  }

  //////////////////////////////click the "Submit"/////
  onSubmit(f:NgForm){
    if (f.invalid) {return;}
    //const posting: Post = f.value;
    //or
    const posting :Post = {
      title : f.value.title,
      content : f.value.content
    }
    console.log(" post-create ");
    console.log(posting);
    f.resetForm();
    this.aPostServiceInstance.PostsSetter(posting);
    //this.ceatingPostEvent2.emit(posting); //emiting event that contains 'posting'
  }
}
