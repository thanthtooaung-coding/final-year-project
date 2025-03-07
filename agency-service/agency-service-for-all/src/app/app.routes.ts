import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    // { path: "login", component: LoginComponent },
    // { path: "register", component: RegisterComponent },
    { path: "post/:id", component: PostDetailComponent },
    // { path: "profile", component: ProfileComponent },
    // { path: "agency/:id", component: AgencyProfileComponent },
    // { path: "create-post", component: CreatePostComponent },
    // { path: "messages", component: MessagesComponent },
];
