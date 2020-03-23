import { Post, Todo, Profile } from './posts/post.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
} ////Const out of class
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private SomePosts: Post[] = []; //here is the publisher?
  private postsUpdated = new Subject<Post[]>();
  // PostsGetter() {
  //   //return this.SomePosts; //it works but a bad practice tho
  //   //this is a reference type, replace this with a deepcopy
  //   return [...this.SomePosts];
  // }

  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  profileUrl: string = 'https://my-json-server.typicode.com/QPeiran/DB_Schema/profile';

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<Profile> {
    return this.http.get<Profile>(this.profileUrl);
  } // GET method


  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  } // GET method

  putTodos(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
   } //PUT method

  PostsSetter(ANewPost: Post) {
    this.SomePosts.push(ANewPost);
    console.log("post.service ");
    console.log(this.SomePosts);
    this.postsUpdated.next([...this.SomePosts]); //now this.subject performing as "Observer"
  }

  postsObservable() {
    console.log("getting Posts: ");
    console.log(this.SomePosts);
    return this.postsUpdated.asObservable(); ///return this.subject as "Observable"
    //Subjects are observables themselves but what sets them apart is that they are also observers.
    //".asObservable()" return a good old Observable version, will make your code much safer and will prevent poor coding practices
  }

  deletePost(i:number){
    this.SomePosts.splice(i,1);
  }
}
