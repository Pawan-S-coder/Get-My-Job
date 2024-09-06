import multer from 'multer';

const storageConfigeration=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/')
    },
    filename:(reqw,file,cb)=>{
        const name= Date.now()+'-'+file.originalName;
        cb(null,name);
    }
});
export const uploadFIle = multer({storage:storageConfigeration});
