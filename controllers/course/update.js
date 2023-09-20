import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import Course from "../../models/course.js";
import { Error } from "mongoose";


export const RegisterCourseUser = asyncHandler(async(req, res) =>{
    //const user = req.user; 
    const user_id = req.user._id; 
    const frontendCourse = req.body.course; 
    const id = req.body.id; 
   
    //get the courseId in the frontendCourse 
    const courseId = frontendCourse[0].courseId
    const findCourse = await Course.findById({ _id:courseId});
    if (!findCourse) {
        res.status(404);
        throw new Error(`${courseId} not found!!!`)
        // save(RegisterCourse, "RegisteredCourse"); 
        
    } 
        

        const updatedUser = await User.findByIdAndUpdate(user_id, 
            {$push: { registeredCourse: findCourse } }, 
            { new: true, useFindAndModify: false  }
            ); 
            if(!updatedUser){
                res.status(400);
                throw new Error(`User with ${user_id} not found!`)
            }
            updatedUser.save() 
            res.status(200).json(updatedUser)
        
       
})