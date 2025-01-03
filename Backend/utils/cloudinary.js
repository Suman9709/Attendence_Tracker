import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath)
            return null;
        //upload the file on cloud
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        //file has been uploaded successfully
        
        console.log("File uploaded on cloudinary successfully",response.url);
        fs.unlinkSync(localFilePath)
        return response;
        
    } catch (error) {
       fs.unlinkSync(localFilePath) //removed the locally saved temproary file as the upload operation got failed 
       return null;
    }
}


export{uploadOnCloudinary}