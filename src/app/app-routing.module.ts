import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './Pages/users/users.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Home Page' },
  { path: 'users', component: UsersComponent, title: 'Users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
