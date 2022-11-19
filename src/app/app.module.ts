import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LoginComponent } from './component/login/login.component';
import { UserRegisterationComponent } from './component/user-registeration/user-registeration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterService } from './service/router.service';
import { RegistrationService } from './service/registration.service';
import { RecommendedComponent } from './component/recommended/recommended.component';
import { FavoriteComponent } from './component/favorite/favorite.component';
import { AuthorComponent } from './component/author/author.component';
import { AuthenticationService } from './service/authentication.service';
import { BooksService } from './service/books.service';
import { BookComponent } from './component/book/book.component';
import { SearchbookPipe } from './pipe/searchbook.pipe';
import { HomeComponent } from './component/home/home.component';
import { UserdashboardComponent } from './component/userdashboard/userdashboard.component';
import { FavoriteService } from './service/favorite.service';
import { AuthorService } from './service/author.service';
import { SearchauthPipe } from './pipe/searchauth.pipe';
import { SharedModule } from './module/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    UserRegisterationComponent,
    RecommendedComponent,
    FavoriteComponent,
    AuthorComponent,
    BookComponent,
    SearchbookPipe,
    HomeComponent,
    UserdashboardComponent,
    SearchauthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
    
    
  ],
  providers: [
    AuthenticationService,
    RouterService,
    RegistrationService,
    BooksService,
    FavoriteService,
    AuthorService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
