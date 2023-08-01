export default class UserDTO {
    constructor(user) {
      delete user.password;
    }
  }
  