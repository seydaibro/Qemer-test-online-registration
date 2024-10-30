

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

  return (
    <>
{isSignUpOpen && <SignUp role="student" onClose={isSignUPClose}/>}
  <Navbar  onOpenSignUP={onOpenSignUP} />
 <Outlet/>
    </>
  );
};

export default RootLayout;
