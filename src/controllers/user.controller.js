import UserModel from "../models/user.model.js";
import JobModel from "../models/job.model.js";
export default class UserController{
    getRegister(req,res){
        // res.locals.user = req.session.user || null;
        const user = req.session.user || null;
        res.render('landingpage',{user});
    }
    postRegister(req,res){
        const{name,email,password}=req.body;
        UserModel.add(name,email,password);

        res.render('loginuser',{user:{email,password},errorMessage:null});
    }
    postLogin(req,res){
        const {email,password}=req.body;
        const isValidUser= UserModel.ValidUser(email, password);
       
        if(!isValidUser){
            return res.render('loginuser',{errorMessage:null})
        }else{
           req.session.user= isValidUser;
           const role = req.query;
           req.session.role = req.query.role || 'jobseeker';
            let jobs= JobModel.get();
            if(!jobs){
               return res.status(404).send('job not found');
            }else{
                return res.render('joblistingpage',{jobs,user:req.session.user})
            }
        }
    }
    getLogin(req, res) {
        const{name,email,password}=req.body;
        UserModel.add(name,email,password);

        res.render('loginuser',{user:{email,password},errorMessage:null});
    }
    logout(req,res){
      req.session.user=null;
      res.clear.cookies('lastVisit');
      res.redirect('/');
    }
 }