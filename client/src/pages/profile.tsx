import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IUser } from '@/interface';
import { ICourse } from '@/interface';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddCourseModal from '@/components/AddCourses';
import SignUp from './signup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getUserById } from '@/redux/user/userSlice';
const Profile = () => {
    const location = useLocation();
    const user: IUser = location.state?.user;
    const dispatch = useDispatch()
    
    const [profileImage, setProfileImage] = useState(user.imageUrl);
    const [isEditOpen, setIseditOpen] = useState(false)
    const { selectedUser } = useSelector((state: RootState) => state.user);
 console.log("user", user)
    const handleEditAccount = () => {
        console.log("Edit account clicked");
    };

    const handleDeleteAccount = () => {
        console.log("Delete account clicked");
    };

    useEffect(()=>{
   dispatch(getUserById({id:user?._id}))
  
    },[])
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            // Optionally upload the image to the server here
        }
    };
    console.log("selecteduser", selectedUser)
    return (
        <>
        {isEditOpen && <SignUp onClose={()=>setIseditOpen(false)} type='edit'/>}
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-6xl bg-white rounded-md overflow-hidden">
                <div className="flex items-center p-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <div className="relative">
                        <img
                            src={profileImage || '/assets/icons/user.png'}
                            alt="User Profile"
                            className="w-36 h-36 rounded-full object-cover cursor-pointer border-4 border-white"
                            onClick={() => document.getElementById('fileInput').click()}
                        />
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <div className="ml-8">
                        <h2 className="text-3xl font-bold">
                            {selectedUser?.firstName} {selectedUser?.surname}
                        </h2>
                        <p className="text-gray-200">{selectedUser?.email}</p>
                        <p className="mt-2">
                            Role: <span className="capitalize">{selectedUser?.role}</span>
                        </p>
                    </div>
                    <div className="ml-auto flex gap-4">
                        <button
                            onClick={()=>setIseditOpen(true)}
                            className="flex items-center bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
                        >
                            <FaEdit className="mr-2" /> Edit Account
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                            <FaTrash className="mr-2" /> Delete Account
                        </button>
                    </div>
                </div>
                <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-6">Enrolled Courses</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {selectedUser?.courses?.map((course: ICourse) => (
                            <div
                                key={course?._id}
                                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
                            >
                                <img
                                    src={course?.imageUrl || '/default-course.jpg'}
                                    alt={course?.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h4 className="font-bold text-lg mb-1">{course?.name}</h4>
                                    <p className="text-gray-600 text-sm">
                                        Duration: {course?.duration} hours
                                    </p>
                                    <p className="text-gray-600 text-sm mb-2">
                                        Students Enrolled: {course?.studentsEnrolled}
                                    </p>
                                    <p className="text-gray-500 text-sm line-clamp-3 overflow-hidden">
                                        {course?.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Profile;
