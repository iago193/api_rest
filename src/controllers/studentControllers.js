import Student from "../models/studentModel.js";

class StudentControllers {

  async index(req, res) {
    try {
      const student = await Student.index();

      return res.json({ success: true, data: student });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }

  async create(req, res) {
    try {
      const student = await Student.create(req.body);

      return res.json({ success: true, data: student });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.show({ id: Number(id) });

      return res.json({ success: true, data: student });
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.update(id, req.body);

      return res.json({ success: true, data: student });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.delete(Number(id));

      return res.json({
        success: true,
        message: `student '${student.nome}' deletado com sucesso.`,
        data: student
      });

    } catch (error) {
      const status = error.status || 500;
      return res.status(status).json({ success: false, error: error.message });
    }
  }



}

export default new StudentControllers();