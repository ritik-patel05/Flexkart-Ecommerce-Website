class Login {
  /**
   * @param {Object} createPostLogic logic to get post
   * @param {Object} validate validate
   */
  constructor(UserRepo) {
    this.UserRepo = UserRepo;
  }

  /**
   * @param {Object} req request object
   * @param {Object} res response object
   */
  async handleRequest(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        const err = new Error("You should enter email address.");
        this.writeResponse(err, null, res);
      }

      if (!password) {
        const err = new Error("You should enter password.");
        this.writeResponse(err, null, res);
      }

      const userData = await this.UserRepo.login(email, password);
      this.writeResponse(null, userData, res);
    } catch (err) {
      this.writeResponse(err, null, res);
    }
  }

  /**
   * @param {Object} err err
   * @param {*} data data to be returned
   * @param {Object} res response
   * @returns {*}
   */
  writeResponse(err, data, res) {
    if (err) {
      res.status(err.code ? err.code : 400);
      return res.send(err.message ? err.message : err);
    }
    res.status(200);
    return res.send(data);
  }
}

export default Login;
