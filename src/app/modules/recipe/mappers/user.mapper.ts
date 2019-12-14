import {RawUser} from "../interfaces/api/raw-user.interface";
import {User} from "../interfaces/user/user.interface";

export class UserMapper {
    public static toModel(rawUser: RawUser): User {
        let user: User = {
            id: rawUser._id,
            username: rawUser.username,
            email: rawUser.email,
            password: rawUser.password,
            isAdmin: rawUser.isAdmin
        };

        return user;
    }
}
