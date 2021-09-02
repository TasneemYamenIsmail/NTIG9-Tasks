export type userType = 'student'| 'teacher';
export type tag = {tag:string};
export type token = {token:string};

export class User{
  id?:string='';
  userName: string;
  password:string;
  phoneNum: string;
  position: string;
  type: boolean;
  profileImg?: string;
  status?: boolean;
  token?:token[]

  public constructor(user: Partial<User>){
    this.id=user.id
    this.userName = user.userName||'';
    this.password = user.password||'';
    this.phoneNum = user.phoneNum||'';
    this.position = user.position||'';
    this.type = user.type||false;
    this.profileImg = user.profileImg||'';
    this.status = user.status||true;
    this.token = user.token||[];
  }
}
