import User from "../models/userModel.js";

class UserControllers {

  async userCreate(req, res) {
    try {
      const user = new User(req.body)
      await user.createUser();
      res.json({ success: true, data: req.body });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

}

export default new UserControllers();