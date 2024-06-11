const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/user.router');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
(async () => {
    await connectDB();

    const app = express();
    const port = 8888;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use("/uploads", express.static('uploads'));

    app.use(cookieParser());
    app.use(router);

    app.listen(port, (err) => {
        if (err) {
            console.error('Error starting server:', err);
        } else {
            console.log(`Server is running on port http://localhost:${port}`);
        }
    });
})();
