import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthorComponent } from './component/author/author.component';
import { FavoriteComponent } from './component/favorite/favorite.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RecommendedComponent } from './component/recommended/recommended.component';
import { UserRegisterationComponent } from './component/user-registeration/user-registeration.component';
import { UserdashboardComponent } from './component/userdashboard/userdashboard.component';

const routes: Routes = [
  { path:"", redirectTo:"home", pathMatch: 'full'},

  { path: 'home' , component:  HomeComponent, children:[
    { path: '', redirectTo: 'recommendation', pathMatch: 'full'},
    { path:"login", component: LoginComponent },
    { path: "register", component: UserRegisterationComponent },
    { path: "recommendation", component: RecommendedComponent }  
]},
  { path: 'userdashboard', component: UserdashboardComponent, children: [
    { path: '', redirectTo: 'recommendation', pathMatch: 'full'},
    { path: "recommendation", component: RecommendedComponent },
    { path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard] },
    { path: 'author', component: AuthorComponent, canActivate: [AuthGuard] }

  ] }  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
