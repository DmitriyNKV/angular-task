import { Component,OnInit } from '@angular/core';
import {CrudService} from "../../service/crud.service";
import {Task} from "../../model/task";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  taskObj: Task = new Task();
  taskArr: Task[]=[];
  addTaskItem:string="";
  editTaskItem:string = "";
  isCompleted: Boolean = false;
  constructor(private crudService: CrudService) {}

  ngOnInit():void{
    this.taskObj =new Task();
    this.taskArr=[];
    this.getAllTask();

  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res=>{
      this.taskArr =res;

    },err=>{
alert("get list of tasks")
    });
  }

  editTask(){
    this.taskObj.taskName = this.editTaskItem;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit()
    },err=>{
      alert("error to update task")
    });
  }
  deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit()
    },err=>{
      alert("error to delete task")
    });
  }

  addTask() {
    this.taskObj.taskName = this.addTaskItem.trim();
    if (this.taskObj.taskName === '') {
      alert('Задача не может быть пустой');
      return;
    }

    this.crudService.addTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
      this.addTaskItem = "";
    },err=>{
      alert(err)
    });
  }


  call (etask:Task){
   this.taskObj = etask;
   this.editTaskItem = etask.taskName;

  }

  toggleTaskCompletion(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.crudService.editTask(task).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("error to update task");
    });
  }



}
