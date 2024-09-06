// import path from 'path';
import JobModel  from '../models/job.model.js';


export default class JobController{
    
    getlendingpage(req,res){
        const user = req.session.user || null;
        res.render('landingpage',{user});
    }
    getJob(req,res){
        // return res.sendFile(path.join(path.resolve(),'src','views','job.ejs'))
        let jobs= JobModel.get();
        const user = req.session.user || null;
        res.render("joblistingpage",{jobs,user})

    };
    getAddJob(req,res){
        const user = req.session.user || null;
        return res.render('newjobpage',{errorMessage:null,user});
    }
    addNewJob(req,res){
        JobModel.add(req.body);
        let jobs= JobModel.get();
        const user = req.session.user || null;
        return res.render('joblistingpage',{jobs,user});
     }
    
     getJobDetails(req,res){
        let jobId=req.params.id;
        let jobFound= JobModel.getById(jobId);
        // let jobs= JobModel.get();
        const user = req.session.user || null;
        
        if(jobFound){
            let createdAt;

        // Check if createdAt exists and is a valid date
        if (jobFound.createdAt) {
            createdAt = new Date(jobFound.createdAt);
        } else {
            // Fallback to current date/time if createdAt is missing
            createdAt = new Date();
            // console.warn(`createdAt was missing for job ID ${jobId}, using current date/time as fallback.`);
        }
            if (isNaN(createdAt.getTime())) {
                return res.status(400).send('Invalid date format in job details.');
            }
            const formattedDate= createdAt.toLocaleDateString('en-US',{
                year:'numeric',
                month:'long',
                day:'numeric'
            });
            const formattedTime= createdAt.toLocaleTimeString('en-US',{
                hour:'2-digit',
                minute:'2-digit',
                hour12:true
            });
            jobFound.formattedDate=formattedDate;
            jobFound.formattedTime=formattedTime;
            res.render('jobdetailpage',{jobFound,user});
           
        }else{
         res.status(404).send('job details didnt find');
        }
     }
     getUpdateJobView(req,res,next){
        const id= req.params.id;
        const job= JobModel.getById(id);
        const user = req.session.user || null;
        if(job){
            res.render('jobupdatepage',{job,errorMessage:null,user})
        }else{
            res.status(404).send("job not found");
        }
        next();
     }
     postUpdateJob(req,res){
        const updatedJob = req.body;
        const success = JobModel.update(updatedJob);
        const user = req.session.user || null;
        if (success) {
            let jobs = JobModel.get();
            return res.render('joblistingpage', { jobs,user });
        } else {
            return res.status(404).send('Job not found or could not be updated');
        }

     };
     deleteJob(req,res){
        const id= req.params.id;
        const success = JobModel.delete(id);
          if (success) {
            let jobs = JobModel.get();
            const user = req.session.user || null;
            return res.render('joblistingpage', { jobs ,user});
        } else {
            return res.status(404).send('Job not found');
        }
     }

     applyJobView(req,res){
        let jobId=req.params.id;
        let jobFound= JobModel.getById(jobId);
       
        if(jobFound){
            const user = req.session.user || null;
             res.render('jobdetailpage',{jobFound,user});
           
    }else{
     res.status(404).send('job details didnt find');
    }
     }

     ApplicantForPostedJob(req,res,next){
        const {name,email,contact}=req.body;
        const resumePath= 'image/'+req.file.name;
       const jobId= req.params.id;
       const job= JobModel.getById(jobId);
      
       if(job){
        const user = req.session.user || null;
        JobModel.addApplicient(jobId,{name,email,contact,resumePath});
         return res.render('jobdetailpage',{jobFound:job,user});

       }else{
        res.status(404).send('job details didnt found');
       }

     };

     getApplicantsList(req,res){
        const applicantId= req.params.id;
        const job= JobModel.getById(applicantId);
       
        req.session.role = req.query.role || 'jobseeker';
     if(job){
        const user = req.session.user || null;
        res.render('applicantview',{job});
     }
        
     }
    
}