import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteComponent } from './component/note/note.component';
import { RemindComponent } from './component/remind/remind.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'note',
    pathMatch: 'full'
  },
  {
    path: 'note',
    component: NoteComponent
  },
  {
    path: 'remind',
    component: RemindComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
