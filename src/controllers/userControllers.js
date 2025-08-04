import User from "../models/userModel.js";

class UserControllers {
  // Criar usuário
  async userCreate(req, res) {
    try {
      const users = await User.createUser(req.body);
      return res.json({ success: true, data: users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // Listar todos usuários
  async index(req, res) {
    try {
      const users = await User.getUser();
      return res.json({ success: true, data: users });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }

  // Mostrar usuário por ID
  async show(req, res) {
    try {
      const user = await User.show({ id: req.params.id });
      return res.json({ success: true, data: user });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }

  // Atualizar usuário por ID
  async update(req, res) {
    try {
      const user = await User.update(req.params.id, req.body);
      return res.json({ success: true, data: user });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }

  // Deletar usuário por ID
  async delete(req, res) {
    try {
      await User.delete(req.params.id);
      return res.json({ success: true, message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }
}

export default new UserControllers();
