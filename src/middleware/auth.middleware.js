export function auth(req,res,next){
    // if(req.session.user){
    //     next();
    // }else{
    //     res.redirect('/login');
    // }
    const userRole=req.session.user;
    if(req.path.startsWith('/postJob') || req.path.startsWith('/job/update') || req.path.startsWith('/job/delete') || req.path.startsWith('/applicants')){
        if(userRole !== 'recruiter'){
            return res.render('notfound');
        }

    }
    next();
}