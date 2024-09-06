export default class UserModel{
    constructor(id,name,email,password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    };
    static add(name,email,password){
        const newUser= new UserModel(users.length+1,name,email,password);
        users.push(newUser);
        return true;
      }
      static ValidUser(email,password){
        const isVaildUser= users.find((u)=>u.email=== email && u.password=== password);
        console.log(isVaildUser);
        return isVaildUser;
      }
      static get(){

        return users;
      }

}

var users=[];