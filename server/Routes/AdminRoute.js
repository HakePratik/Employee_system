import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mulder from 'multer'
import { URLSearchParams } from 'url'
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

router.get('/get_employees', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
      if (err) return res.json({ status: false, Error: "Query error" });
      return res.json({ status: true, Result: result });
    });
  });

router.post("/Addemployee", upload.single('image'), (req, res) => {
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
      if (err) {
        console.error("SQL Error:", err);
        return res.json({ status: false, Error: "Query error" })
      }
      return res.json({ status: true, message: "Employee added successfully" });
    });
  });

  router.get('/get_employees/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
      if (err) return res.json({ status: false, Error: "Query error" });
      return res.json({ status: true, Result: result });
    });
  });

  router.put('/Editemployee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`
    const values = [
      req.body.name,
      req.body.email,
      req.body.salary,
      req.body.address,
      req.body.category_id
    ]
    con.query(sql, [...values, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" + err })
      return res.json({ Status: true, Result: result })
    })
  })
});

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
      if (err) return res.json({ status: false, Error: "Query error" });
      return res.json({ status: true, Result: result });
    });
  });

router.get('/get_admins', (req, res) => {
  const sql = "SELECT COUNT(id) as admin FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "Query error" });
    return res.json({ status: true, Result: result });
  })
  });
router.get('/count_employees', (req, res) => {
  const sql = "SELECT COUNT(id) as employee FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "Query error" });
    return res.json({ status: true, Result: result });
  })
  });
router.get('/get_salarys', (req, res) => {
  const sql = "SELECT sum(salary) as salary FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "Query error" });
    return res.json({ status: true, Result: result });
  })
  });

router.get('/admin_recoords', (req, res) => {
  const sql = "SELECT * FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ status: false, Error: "Query error" });
    return res.json({ status: true, Result: result });
  })
  });

  router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true, message: "Logout successful" });
    })

export { router as adminRouter }