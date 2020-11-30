import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  { path: "kursused", component: CoursesComponent },
  { path: "hobid", component: HobbiesComponent },
  { path: "work", component: WorkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
