const { Router } = require("express");
const { addblog, Home, createblog, showUpdateBlogForm, updateBlog, deleteBlog, signUpPage, signUp, logInPage, logIn, logout } = require("../controllers/user.controller");
const upload = require('../middleware/multer');
const router = Router();
const { userAuth } = require("../middleware/blog.auth")

router.get("/", Home);
router.get("/addblog", addblog);
router.post("/addblog", upload.single('blogImage'), createblog);
router.get("/updateblog/:id", showUpdateBlogForm);
router.post("/updateblog/:id", upload.single('blogImage'), updateBlog);

router.post("/deleteblog/:id", deleteBlog);
router.get("/signup", signUpPage);
router.post("/signup", signUp);
router.get("/login", logInPage);
router.post("/login", logIn);
router.get("/logout", logout)


module.exports = router;

