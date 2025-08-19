import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { URLSearchParams } from 'url'
const router = express.Router()

router.post('/employeelogin', (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, responce) => {
                if (err) return res.json({ loginStatus: false, Error: "Query error" })
                if (responce) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "employee", email: email, id: result[0].id },
                        "jwt_secret_key",
                        { expiresIn: "1d" }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true ,id: result[0].id});
                }
            })
        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" });
        }
    });
    router.get('/information/:id', (req, res) => {
        const {id} = req.params;
        const sql= "select * from employee where id = ?"
        con.query(sql, [id], (err, result) => {
            if (err) return res.json({ status: false, Error: "Query error" });
            return res.json(result);
        })
    });

    router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true, message: "Logout successful" });
    })
})

export { router as employeeRouter }