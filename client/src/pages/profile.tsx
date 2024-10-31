
import { useLocation } from "react-router-dom";
import { IUser } from "@/interface";



const Profile = () => {
    const location = useLocation();
const user: IUser = location.state?.user;
console.log("user", user)
  return (
    <div>
      profile
    </div>
  )
}

export default Profile
