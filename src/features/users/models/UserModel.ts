import { UserType } from "./UserType";

export default class UserModel {
  username: string;
  displayName: string | null;
  type: UserType;
}
