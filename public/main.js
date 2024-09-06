function deleteJob(id){
    const result= confirm('are you sure you want to delete the Job?');
    if(result){
        fetch("/job/delete/"+id,{
            method:'post'
        }).then((res)=>{
           if(res.ok){
            window.location.href='/jobs';
           }
        })

    }
}