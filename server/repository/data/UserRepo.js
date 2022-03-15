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

    const { id, firstName, lastName, phoneNumber } = user;
    const jwtPayload = { id, firstName, lastName, email, phoneNumber };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);
    const data = {
      token: `Bearer ${token}`,
      user,
      message: "Login Successful",
    };

    return data;
  }

  /**
   * Signup logic handler
   * @param {String} email email of user
   * @param {String} password password of user
   * @returns {Object} data to be sent in api response
   */
  async signup(email, password, firstName, lastName) {
    let existingUser;
    try {
      existingUser = await this.UserModel.findOne({ email });
    } catch (err) {
      err.message = "Error occurred during signup of user";
      throw err;
    }

    if (existingUser) {
      throw new Error("User already exists. Try to login");
    }

    const user = new this.UserModel({
      email,
      password,
      firstName,
      lastName,
    });

    let savedUser;
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;

      savedUser = await user.save();
    } catch (err) {
      err.message = "Error occurred during saving of user to database";
      throw err;
    }

    const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const data = {
      token: `Bearer ${token}`,
      user: {
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        role: savedUser.role,
        email: savedUser.email,
      },
    };

    return data;
  }
}

export default UserRepo;
