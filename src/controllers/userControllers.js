import User from "../models/userModel.js";

class UserControllers {

  async create(req, res) {
    try {
      const users = await User.createUser(req.body);
      return res.json({ success: true, data: users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }


  async index(req, res) {
    try {
      const users = await User.getUser();
      return res.json({ success: true, data: users });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }


  async show(req, res) {
    try {
      const user = await User.show({ id: req.userId });
      return res.json({ success: true, data: user });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }


  async update(req, res) {
    try {
      const user = await User.update(req.userId, req.body);
      return res.json({ success: true, data: user });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }


  async delete(req, res) {
    try {
      await User.delete(req.userId);
      return res.json({ success: true, message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }
}

export default new UserControllers();
