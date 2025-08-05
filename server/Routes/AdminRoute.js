import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mulder from 'multer'
import path from 'path'
const router = express.Router()

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

router.post("/addcategory", (req, res) => {
  const sql = "INSERT INTO category (name) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ status: false, Error: "Query error" });
    return res.json({ status: true, message: "Category added successfully" });
  });
});


router.get('/get_category', (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "Query error" });
    return res.json({ status: true, Result: result });
  });
});

//image uploding
const storage = mulder.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
  }
})
const upload = mulder({ storage: storage })

router.post("/Addemployee",upload.single('image'), (req, res) => {
  const sql = "INSERT INTO employee (name, email, password, address, salary, image, category_id) VALUES (?)";
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ status: false, Error: "Hashing error" });

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      parseInt(req.body.salary),
      req.file.filename,
      req.body.category_id
    ];
    con.query(sql, [values], (err, result) => {
      if (err) {console.error("SQL Error:", err);
        return res.json({ status: false, Error: "Query error" })
      }
      return res.json({ status: true, message: "Employee added successfully" });
    });
    console.log(values)
  });

  router.get('/get_employees', (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "Query error" });
    return res.json({ status: true, Result: result });
  });
});

});



export { router as adminRouter }