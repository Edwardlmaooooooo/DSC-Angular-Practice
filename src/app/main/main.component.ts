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
    //講師寫在 constructor
    this.route.queryParams.subscribe(
      (param)=>{
      this.cond = param["cond"];
      if(this.cond == undefined){
        this.cond = "all";
      }

    });
    /*
    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.cond = params.get('cond');     
      },
      error: (err) => { },
      complete: () => { }
    })

    this.route.queryParamMap.pipe(
      //map(params => params.get("cond"))
    )*/
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

  gotoAbout(){

    console.log(this.route);

    // 絕對路徑的寫法
    //this.router.navigate(["/about"]);

    // 相對路徑的寫法
    this.router.navigate(["./about"], {relativeTo: this.route});
  }
}
