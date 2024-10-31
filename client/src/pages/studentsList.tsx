import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { getAllUser } from "@/redux/user/userSlice";
import { useEffect } from "react";


const StudentsList = () => {
    const dispatch = useDispatch()
    const { users, isLoading } = useSelector((state: RootState) => state.user);

    useEffect(()=>{
     dispatch(getAllUser())
    },[])
    console.log("user", users)
   
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Photo</th>
          <th className="py-2 px-4 border-b">Full Name</th>
          <th className="py-2 px-4 border-b">Age</th>
          <th className="py-2 px-4 border-b">Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-gray-100">
            {/* Photo with circular outline */}
            <td className="py-2 px-4 text-center">
              <div className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center border-2 border-gray-300 mx-auto">
                {/* Placeholder image */}
                <span className="text-xl text-gray-500">👤</span>
              </div>
            </td>
            {/* Full Name (trimmed first and surname) */}
            <td className="py-2 px-4 text-center">{`${user.firstName.trim()} ${user.surname.trim()}`}</td>
            {/* Age */}
            <td className="py-2 px-4 text-center">{user.age ? `${user.age} years` : 'N/A'}</td>
            {/* Email */}
            <td className="py-2 px-4 text-center text-blue-600">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default StudentsList
