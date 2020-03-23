import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemesComponent } from './memes/memes.component';
import { DogmemesComponent } from './dogmemes/dogmemes.component';


const routes: Routes = [
  {path: 'catmemes', component: MemesComponent},
  {path: 'dogmemes', component: DogmemesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rountingComponents = [MemesComponent, DogmemesComponent]
