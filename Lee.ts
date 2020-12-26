// @ts-ignore
// class Lee {
//     name: string = 'hanyun'
//
//     say() {
//         console.log(this.name)
//     }
// }
//
// let lee = new Lee();
// lee.say();
interface IUser {
    name: string
}

class Lee<IUser> {
    user: IUser


    constructor(user: IUser) {
        this.user = user
    }

    say() {
        console.log(this.user)
    }
}

let lee = new Lee({name: "hanyun"})
lee.say();