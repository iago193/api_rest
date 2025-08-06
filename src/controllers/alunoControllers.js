import Aluno from "../models/alunoModel.js";

class AlunoControllers {

  async create(req, res) {
    try {
      const aluno = new Aluno(req.body);
      await aluno.createAluno();    
      return res.json({ success: true, data: req.body });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

}

export default new AlunoControllers();