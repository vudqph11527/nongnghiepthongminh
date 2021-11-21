class HomeController {
  home(req, res) {
    return res.render("home");
  }
}
module.exports = new HomeController();
