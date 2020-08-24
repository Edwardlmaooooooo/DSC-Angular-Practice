import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model"
import { map, switchMap, concatMap, mergeMap } from "rxjs/operators"
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  users = []
  user;
  
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.route.queryParamMap.pipe(
      map(params => params.get("userId")),
      switchMap( userId => this.httpClient.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`))
    ).subscribe({
      next: user => this.user = user
    })
    
   }


  ngOnInit(): void {
    this.httpClient.get<User[]>("https://jsonplaceholder.typicode.com/users")
    .pipe(
      map(users => users.map(x => ({ id: x.id, name: x.name})))
    )
    .subscribe({
      next: data => this.users = data
    })
  }



}
