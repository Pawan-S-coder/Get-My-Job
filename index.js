// import all the third party modules....
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';


// importing all the express inbult modules modules here...

import path from 'path';
import { urlencoded } from 'express';

// import all user define modules...
import JobController from './src/controllers/job.controller.js';
import { jobFormValidation  } from './src/middleware/jobpostingvalidation.middleware.js';
import { uploadFIle } from './src/middleware/fileupload.middleware.js';
import { auth } from './src/middleware/auth.middleware.js';
import { setLastVisit } from './src/middleware/lastvisit.middleware.js';
import UserController from './src/controllers/user.controller.js';
import  sendMail  from './src/middleware/confiremail.middleware.js';

const app= express();
const jobController = new JobController();
const userController= new UserController();
app.use(ejsLayouts);
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'src','views'))
app.use(express.static('public'));
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false},
}));
app.use(cookieParser());
// app.use(setLastVisit);
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Set user session data to res.locals
    next();
});

//  all requests call here ...
app.get('/',jobController.getlendingpage)
app.get('/jobs',jobController.getJob);
app.get('/postjob',auth,jobController.getAddJob);
app.get('/job/update/:id',auth,jobController.getUpdateJobView);
app.get('/jobs/:id',jobController.getJobDetails)
app.post('/jobs',auth,jobFormValidation,setLastVisit,jobController.addNewJob);
app.post('/updateJob',auth,jobFormValidation,jobController.postUpdateJob);
app.post('/job/delete/:id',auth,jobController.deleteJob);
app.post('/job/apply/:id',uploadFIle.single('resume'),sendMail,jobController.ApplicantForPostedJob);
app.get('/applicants/:id',setLastVisit,jobController.getApplicantsList);


// requests for user....
app.get('/register',userController.getRegister);
app.post('/register',userController.postRegister);
app.get('/login',userController.getLogin);
app.post('/login',setLastVisit,userController.postLogin);
app.get('/logout',userController.logout);
export default app;