import { PostsComponent } from './pages/posts/posts.component';
import type { Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { PostDetailComponent } from "./pages/post-detail/post-detail.component"

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "post/:id",
    component: PostDetailComponent,
  },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./pages/register/register.component").then((m) => m.RegisterComponent),
  },
  {
    path: "profile",
    loadComponent: () => import("./pages/profile/profile.component").then((m) => m.ProfileComponent),
  },
  {
    path: "agency/:id",
    loadComponent: () =>
      import("./pages/agency-profile/agency-profile.component").then((m) => m.AgencyProfileComponent),
  },
  {
    path: "create-post",
    loadComponent: () => import("./pages/create-post/create-post.component").then((m) => m.CreatePostComponent),
  },
  {
    path: "messages",
    loadComponent: () => import("./pages/messages/messages.component").then((m) => m.MessagesComponent),
  },
  {
    path: "agencies",
    loadComponent: () => import("./pages/agencies/agencies.component").then((m) => m.AgenciesComponent),
  },
  {
    path: "services",
    loadComponent: () => import("./pages/services/services.component").then((m) => m.ServicesComponent),
  },
  {
    path: "about",
    loadComponent: () => import("./pages/about/about.component").then((m) => m.AboutComponent),
  },
  {
    path: "blog",
    loadComponent: () => import("./pages/blog/blog.component").then((m) => m.BlogComponent),
  },
  {
    path: "posts",
    loadComponent: () => import("./pages/posts/posts.component").then((m) => m.PostsComponent),
  },
]

