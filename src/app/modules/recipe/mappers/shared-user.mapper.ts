import {SharedUser} from "../interfaces/user/shared-user.interface";
import {RawSharedUser} from "../interfaces/api/raw-shared-user.interface";

export class SharedUserMapper {
    public static toModel(rawSharedUser: RawSharedUser): SharedUser {
        let sharedUser: SharedUser = {
            id: rawSharedUser._id,
            username: rawSharedUser.username,
        };

        return sharedUser;
    }
}
