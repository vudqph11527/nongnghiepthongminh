const { verify } = require("jsonwebtoken");
module.exports = {
  checkToken: function (req, res, next) {
    const token = req.get("auth-token");
    if (!token) {
      return res.status(401).send("Từ chối quyền truy cập");
    }
    try {
      const verifeid = jwt.verify(token, process.env.token_secret);
      req.user = verifeid;
    } catch (err) {
      res.status(400).send("Sai Token");
    }
  },
};

