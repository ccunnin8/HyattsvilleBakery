const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");
const bcrypt = require("bcrypt");
const multer = require("multer");

const upload = multer({ dest: "images/", preservePath: true })
// INITIALIZE APP AND MIDDLEWARE 

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(session({ secret: "hyattsville bakery", resave: false, saveUninitialized: true }));


// PATHS 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
})

app.get("/location", (req, res) => {
    res.sendFile(path.join(__dirname, "views/location.html"));
});

app.get("/menu", (req, res) => {
    res.sendFile(path.join(__dirname, "views/menu.html"));
})

app.post("/contact", (req, res) => {
    const { email, message } = req.body;
    res.json({email, message});
});

app.get("/admin", (req, res) => {
    if (!req.session.loggedin) {
        res.redirect("/login")
    } else {
        res.sendFile(path.join(__dirname, "views/admin.html"));
    }
});

app.get("/blog/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "views/blog.html"));
})

app.post("/blog", (req, res) => {
    db.get("select * from blogs where id = ?", req.body.id, (err, row) => {
        if (err || !row) {
            res.json({status: "error", msg: err ? err : "no blog found!" })
        } else {
            res.json({ status: "success", blog: row });
        }
    });
});

app.get("/blogs", (req, res) => {
    db.all("select * from blogs", (err, rows) => {
        if (err) {
            res.json({ status: "error", msg: err})
        } else {
            res.json({ status: "success", entries: rows })
        }
    });
});

app.delete("/blog", (req, res) => {
    const { id } = req.body;
    db.run("delete from blogs where id = ?", id, err => {
        if (err) {
            console.log(err);
            res.json({status: "error", msg: err})
        } else {
            res.json({status: "success"});
        }
    });
});

app.post("/blog/new", upload.single("image"), (req, res) => {
    const { title, content, id } = req.body;
    const { filename } = req.file;
    db.run("insert into blogs (id, title, content, img) values (?, ?, ?, ?)", [id, title, content, filename], (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/admin");
    });
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.get("select * from users where username = ?", username, (err, row) => {
        if (err || !row) {
            res.json({ err, status: "error", msg: "username not found" })
        } else {
            bcrypt.compare(password, row.password, (err, result) => {
                if (err || !result) {
                    res.json({ status: "error", msg: "password incorrect"})
                } else {
                    req.session.loggedin = true;
                    res.json({ result, status: "success" })
                }
            })
        }
    });
});

app.get("/logout", (req, res) => {
    req.session.loggedin = false;
    res.redirect("/login");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "views/404.html"));
})



// RUN SERVER 
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})