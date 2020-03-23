import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post, Todo } from '../post.model';
import { PostService } from 'src/app/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent1 implements OnInit, OnDestroy{
  @Input() posts1 : Post[] = [];
  posts2 : Post[] = [];
  private postsSub = new Subscription;

  constructor (public postService: PostService){
    //"public" keywork automatically create a new property (postService)
    //in this component and store the incoming value in that property
  }

  ngOnInit() {
    //this.posts2 = this.postService.PostsGetter();
    const myObservable = this.postService.postsObservable();
    const myObserver =  (posts: Post[]) => {
           console.log("Hi from myObserver!");
           this.posts2 = posts;
           console.log(this.posts2);}
    ////////////////////////////////////////// not working
    // const myObserver =  function (posts: Post[]) {
    //   console.log("Hi!");
    //   this.posts2 = posts;
    //   console.log(this.posts2);}
    // OR
    // const myObserver = {
    //   next: function (posts: Post[]) {
    //     console.log("Hi!");
    //     this.posts2 = posts;
    //     console.log(this.posts2);
    //   },
    //   error: function (error){},
    //   complete: function() {}
    // };
    //////////////////////////////////////////////
    console.log(myObserver);//it only execute once when the "PostListComponent1" initialize
     //call subscribe() method from "Observable" class
     this.postsSub = myObservable.subscribe(myObserver);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  FetchPost(obj: Post, i: number) {
    // this.postService.getTodos().subscribe((todos) => {
    //   console.log(todos[i]);
    //   obj.title = todos[i].title;
    // });
    this.postService.getProfiles().subscribe(P => {
      console.log(P);
      obj.title = P.name;
      obj.content = P.descriptions;
    })
    let newTodo: Todo = {
      "userId": i++,
      "id": i++,
      "title": obj.content,
      "completed": true
    }
    this.postService.putTodos(newTodo).subscribe((todos)=>{
      console.log(todos);
      console.dir(todos)
    });
    //console.dir(obj);
    //console.log(obj.title);
  }

  DeletePost(obj:Post, index: number) {
    this.posts2 = this.posts2.filter((p) => p != obj);
    this.postService.deletePost(index);
    //this.posts2.splice(index,1);
    console.log(this.posts2);
  }
 }
