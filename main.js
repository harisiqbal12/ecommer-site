const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const authRouter = require('./routes/admin/auth');
const adminProductRouter = require('./routes/admin/product');
const productRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["ehs5d1v5r8g0dscd"],
	})
);

app.use(authRouter);
app.use(adminProductRouter);
app.use(productRouter);
app.use(cartsRouter);



app.listen(3000, () => {
	console.log("listening");
});
