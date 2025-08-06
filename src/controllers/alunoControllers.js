import Aluno from "../models/alunoModel.js";

class AlunoControllers {

  async index(req, res) {
    try {
      const aluno = await Aluno.index();

      return res.json({ success: true, data: aluno });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }

  async create(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      return res.json({ success: true, data: aluno });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.show({ id: Number(id) });

      return res.json({ success: true, data: aluno });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.update(id, req.body);

      return res.json({ success: true, data: aluno });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.delete(Number(id));

      return res.json({
        success: true,
        message: `Aluno '${aluno.nome}' deletado com sucesso.`,
        data: aluno
      });

    } catch (error) {
      const status = error.status || 500;
      return res.status(status).json({ success: false, error: error.message });
    }
  }



}

export default new AlunoControllers();