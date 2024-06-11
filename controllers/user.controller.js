const Blog = require('../models/blogModel');
const fs = require('fs');
const User = require('../models/user.schema')

const Home = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('index', { blogs });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

}
const addblog = (req, res) => {
    return res.render('addblog')
}
const createblog = async (req, res) => {
    try {
        const { title, description } = req.body; // ADD DATA FROM FORM TITLE AND DESCRIPTION
        const blogImage = req.file ? req.file.path : null; //  WHICH MEANS IF YOU GET ANY FILE THEN TAKE HIS PATH OTHERWISE ITS NULL
        const newBlog = new Blog({ title, description, blogImage }); // PUTTING DATA INTO THE BLOG MODAL
        await newBlog.save(); // ALAWAYS SAVE IT 
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
}


const showUpdateBlogForm = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id); // TO FIND THE BLOG FROM THE THEIR ID .. WE WILL GET THE ID FROM THE THE BUTTON WHAT WE PRESS IN INDEX.EJS " /updateblog/<%= blog._id %> "
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.render('updateblog', { blog });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const updateBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        const blogImage = req.file ? req.file.path : req.body.oldImage;
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            title,
            description,
            blogImage,
        }, { new: true });

        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.redirect('/');
    } catch (error) {
        console.error("Error deleting blog: ", error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
const signUpPage = (req, res) => {
    return res.render("signup");
};

const logInPage = (req, res) => {
    return res.render("login");
};

const logout = (req, res) => {
    res.clearCookie('USER');
    res.redirect('/login');
};

const signUp = async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            res.cookie('USER', user.id).redirect("/");
        } else {
            console.log("Email or password must be wrong");
            res.redirect("/login");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    Home, addblog, createblog, showUpdateBlogForm, updateBlog, deleteBlog, signUpPage, logInPage, logout, signUp, logIn
}