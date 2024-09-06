export default class JobModel{
    constructor(id,job_category,job_designation,job_location,company_name,salary,
        apply_by,skills_required,number_of_openings,job_posted,applicants){
       this.id=id;
       this.jobCategory=job_category;
       this.jobDesignation=job_designation;
       this.jobLocation=job_location;
       this.companyName=company_name;
       this.salary=salary;
       this.applyBy=apply_by;
       this.skillsRequired=skills_required;
       this.numberOfOpenings=number_of_openings;
       this.jobPosted=job_posted;
       this.applicants=applicants || [];
     }
    static get(){
        return jobs;
    }

    static add(newJob){
        const jobsToAdd= {...newJob,id:`${jobs.length+1}-${newJob.companyName}`,};
        jobs.push(jobsToAdd);
        // console.log(jobsToAdd)
        return true;
    }
    static getById(id){
      return jobs.find(j => j.id ===id);
   }
   static update(jobObj){
    console.log('jobObj:', jobObj);
    const index= jobs.findIndex((j)=> j.id === jobObj.id);
    console.log(index);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...jobObj };
      return jobs[index];
      // console.log(jobs[index]);
      console.log(jobs);
  }else{
    console.log(`Job with id ${jobObj.id} not found`);
  return false;
  }
    };
    static delete(id){
      const index = jobs.findIndex(j => j.id === id);
      if (index !== -1) {
          jobs.splice(index, 1);
          return true;
      }
      return false;
  };
    static addApplicient(jobId,applicant){
      const job=jobs.find((j)=> j.id === jobId);
       // Check if the job exists
  if (!job) {
    console.error(`Job with id ${jobId} not found`);
    return false;
  }

  // Ensure the applicants array is initialized
  if (!job.applicants) {
    job.applicants = [];
  }
      
        applicant.id= `${job.applicants.length + 1}`;
        job.applicants.push(applicant);
        console.log(job);
        return true;
     
     }
    }


// array where  are all the jobs submitted by compney ...
var jobs=[{id:'1-TCS',
    jobCategory:'Tech',
    jobDesignation:'HR',
    jobLocation:"Noida",
    companyName:'TCS',
    salary:6000000,
    applyBy:'28-08-2024',
  skillsRequired: ['React','NodeJs','Java'],
  numberOfOpenings:4,
  jobPosted:{formattedDate:'28-07-2024',formattedtime:'12:20pm'},
  applicants:[{
    id:3,
    name:'john',
    email:'john@gmail.com',
    contact:'1234567890',
    resumePath:'./public'
  },]},];