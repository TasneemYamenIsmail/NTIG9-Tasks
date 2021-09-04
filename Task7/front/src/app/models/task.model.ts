
export type status = {status:string};
export type note = {note:string};

export class Task{
  _id?:string='';
  name: string;
  type:string;
  dueDate: Date;
  description?: string;
  employeeId: string;
  managerId: string;
  statuses?: status[];
  notes?:note[];
  status?: string=''
  note?:string=''

  public constructor(task: Partial<Task>){
    this._id=task._id
    this.name = task.name||'';
    this.dueDate = task.dueDate||new Date();
    this.description = task.description||'';
    this.employeeId = task.employeeId||'';
    this.managerId = task.managerId||'';
    this.type = task.type||'';
    this.statuses = task.statuses||[];
    this.notes = task.notes||[];
    this.status = task.status||'';
    this.note = task.note||'';
  }
}
