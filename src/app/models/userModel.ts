export class UserModel{

    private firstName:String;
    private lastName:String;
    private email:String;
    private username:String;
    
    constructor(user:any){
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.username = user.username;
    }

}