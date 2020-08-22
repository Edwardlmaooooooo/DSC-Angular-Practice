import { Component, OnInit, Input, Output } from '@angular/core';
import { HandleTodoService} from "../todo-item/todo-service.service"
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  @Input("window") window;
  cond = "";
  ngOnInit(): void {
    this.route.queryParams.subscribe((param)=>{
      this.cond=(param['cond']);
      if(this.cond == undefined){
        this.cond = "all";
      }
    });
    
  }
  someMethod(){
    return "ToDo";
  }
  
  constructor(public service: HandleTodoService, private router:Router, private route:ActivatedRoute){ }
  title = this.someMethod();
  
  
  addTodoList(event) {
    this.service.addTodoList(event);
  }

  newTodo = "";



  InputPlaceHolder="What needs to be done???"

  //cond = "all";
  setCond(s){
    this.cond = s;
  }
  
  
  updateLeft(){
    //this.itemLeft = this.todoList.length
  }

  //用這個會自動確認
  ngDoCheck() {
    this.service.DoCheck();
  }
  
  clearCompleted(){
    this.service.clearCompleted();
  }

  allComplete(){
    this.service.allComplete();
  }
}
