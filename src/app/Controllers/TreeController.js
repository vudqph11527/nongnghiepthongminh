const db = require("../../config/db");

class TreeController {

    addNewTree(req, res, next) {
        return res.send("Thêm mới cây trồng");
    }

    getAllTree(req, res, next) {
        return res.send("Lấy tất cả cây trồng");
    }

    deleteTree(req, res, next) {
        return res.send("Xóa cây trồng");
    }

    updateTree(req, res, next) {
        return res.send("Cập nhật cây trồng");
    }
}
module.exports = new TreeController();