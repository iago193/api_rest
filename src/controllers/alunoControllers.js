import Aluno from "../models/alunoModel.js";

class AlunoControllers {

  async alunoCreate(req, res) {
    try {
      const aluno = new Aluno(req.body)
      await aluno.createAluno();
      res.json({ success: true, data: req.body });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

}

export default new AlunoControllers();