

import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SignUp from "@/pages/signup";
import SignIn from "@/pages/signin";


interface itemProp{
  onOpenSignUP:()=> void
  isSignUpOpen: boolean
  isSignUPClose:()=>void
}
const RootLayout = ({onOpenSignUP, isSignUpOpen,isSignUPClose}:itemProp) => {
const [isOpenLogin, setIsOpenLogin] = useState(false)
  return (
    <>
{isSignUpOpen && <SignUp  type="add" role="student" onClose={isSignUPClose}/>}
{isOpenLogin && <SignIn onClose={()=>setIsOpenLogin(false)}  />}
  <Navbar  onOpenSignUP={onOpenSignUP} onOpenLogin={()=>setIsOpenLogin(true)} />      
 <Outlet/>
    </>
  );
};

export default RootLayout;
