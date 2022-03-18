const express=require('express');
const app=express();
const morgan=require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
// const upload=require('express-fileupload')

mongoose.connect("mongodb+srv://admin:thunDer@1234@cluster0.2q99l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
);
mongoose.Promise=global.Promise;


app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

//routes
app.use('/api/payment',require('./router/payment'));
app.use('/api/signUp',require('./router/signUp'));
app.use('/api/signIn',require('./router/signIn'));
app.use('/api/v1/auth/google',require('./router/authApi'));
app.use('/api/addDonee',require('./router/addDonee'));
app.use('/api/readDonee',require('./router/readDonee'));
app.use('/api/readuser',require('./router/readUser'));
app.use('/api/post',require('./router/post'));
app.use('/api/updateLocation',require('./router/updateLocation'));
app.use('/api/user',require('./router/user'));
app.use('/api/auth/confirm',require('./router/confirmCode'));
app.use('/api/donations',require('./router/donations'));


module.exports=app;