class HomeControllers{
  index(req, res) {
    res.json({
      "TudoCerto": true
    });
  }
}

export default new HomeControllers();
