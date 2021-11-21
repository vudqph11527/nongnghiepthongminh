const db = require("../../config/db");
const { create, loginByUser } = require("../Models/userModal");
const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");

const { registerValidate, loginValidate } = require("../../middleware/users");
const { getUsersByUsername } = require("./DatasController");


class AccountController {
  login(req, res, next) {
    const { error } = loginValidate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const body = req.body;
    loginByUser(body.username, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Tài khoản hoặc mật khẩu không chính xác",
        });
      }
      const result = compareSync(body.password, results.password);

      if (result) {
        results.password = undefined;
        const token = sign({ result: results }, process.env.token_secret, {
          expiresIn: "1h",
        });
        // res.header("auth-token", token).send(token);
        return res.json({ success: 1, message: "Thành Công", token: token });
      } else {
        return res.json({
          success: 0,
          data: "Tài khoản hoặc mật khẩu không chính xác",
        });
      }
    });
  }


  async register(req, res, next) {
    const { error } = registerValidate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const body = req.body;
    try {
      const salt = await genSaltSync(10);
      body.password = await hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Lỗi kết nối cơ sở dữ liệu",
          });
        }
        return res.status(200).json({ success: 1, data: results });
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
}


module.exports = new AccountController();
