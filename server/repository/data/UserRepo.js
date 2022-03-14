import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserRepo {
  /**
   * Creates an instance of UserRepo
   * @param {Object} UserModel
   */
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  /**
   * Login logic handler
   * @param {String} email email of user
   * @param {String} password password of user
   * @returns {Object} data to be sent in api response
   */
  async login(email, password) {
    let user;
    try {
      user = await this.UserModel.findOne({ email });
    } catch (err) {
      err.message = "Error occurred during login of user";
      throw err;
    }

    if (!user) {
      throw new Error(
        "You should sign up, no user exists for this email address."
      );
    }

    let isPasswordMatch;
    try {
      isPasswordMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      err.message = "Error occurred during login of user";
      throw err;
    }

    if (!isPasswordMatch) {
      throw new Error("Incorrect Password.");
    }

    const { _id, firstName, lastName, phoneNumber } = user;
    const jwtPayload = { id: _id, firstName, lastName, email, phoneNumber };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);
    const data = {
      token,
      user,
      message: "Login Successful",
    };

    return data;
  }
}

export default UserRepo;
