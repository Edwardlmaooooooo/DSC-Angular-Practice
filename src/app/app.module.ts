import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Router, Routes } from "@angular/router"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FilterPipe } from './filter.pipe';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from "@angular/common/http";
import { UsersComponent } from './about/users/users.component'

const routes: Routes = [
  {path: '', component: MainComponent, data: {
    cond: "active",
  }, resolve:{
    // resolve 負責非同步的東西
    // 會等跑完 resolve 才執行 construct
    // Call API 使用
    // 不建議呼叫太久，不然使用者體驗不好
    // 要等太久，建議先進去，做出 Loading 的圖示
  }},
  {path: "about", component: AboutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TodoItemComponent,
    FilterPipe,
    AboutComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
