import React from "react";
import { MdOutlineDashboard, MdOutlineCreditScore, MdOutlineDataThresholding } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { LuWarehouse } from "react-icons/lu";
import { MdOutlineAssignmentReturned } from "react-icons/md";
import { SlCalender } from "react-icons/sl";


export type INavLink = {
  icon: React.ElementType;
  route?: string;
  label: string;
  permission?:string;
};
export const sidebarLinks: INavLink[] = [
  {
    icon: MdOutlineDashboard,
    route: "/",
    label: "Dashboard",
    permission:"dashboard page"
  },
  {
    icon: CiShop,
    route: "/shop",
    label: "Shops",
    permission:"shop page"
  },
  {
    icon: LuWarehouse,
    route: "/warehouse",
    label: "Warehouses",
    permission:"warehouse page"

  },
  {
    icon: SlCalender,
    route: "/sales_history",
    label: "Sales",
    permission:"sales history"

  },
  {
    icon: MdOutlineDataThresholding,
    route: "/hold_history",
    label: "Holds",
    permission:"hold page"

  },
  {
    icon: MdOutlineAssignmentReturned,
    route: "/returns",
    label: "Returns",
    permission:"hold page"
  },
  {
    icon: MdOutlineCreditScore,
    route: "/credit",
    label: "Credit",
    permission:"credit page"
  },
  // {
  //   icon: IoSettingsOutline,
   
  //   label: "Seting",
  //   route: null
  // },
];

export const bottombarLinks: INavLink[] = [
  {
    icon: MdOutlineDashboard,
    route: "/",
    label: "Dashboard",
    permission:"dashboard page"

  },
  {
    icon: CiShop,
    route: "/shop",
    label: "Shop",
    permission:"shop page"

  },
  {
    icon: LuWarehouse,
    route: "/warehouse",
    label: "Warehouse",
    permission:"warehouse page"

  },
  {
    icon: SlCalender,
    route: "/sales_history",
    label: "Sales",
    permission:"sales history"

  },
  {
    icon:MdOutlineDataThresholding,
    route: "/hold_history",
    label: "Holds",
    permission:"hold page"

  },
  
];


 export const mockData = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
  { id: 3, name: 'David' },
  { id: 4, name: 'Emily' },
  { id: 5, name: 'Michael' },
  { id: 6, name: 'Olivia' },
  { id: 7, name: 'William' },
  { id: 8, name: 'Sophia' },
  { id: 9, name: 'James' },
  { id: 10, name: 'Emma' },
  { id: 11, name: 'Alexander' },
  { id: 12, name: 'Ava' },
  { id: 13, name: 'Daniel' },
  { id: 14, name: 'Isabella' },
  { id: 15, name: 'Matthew' },
  { id: 16, name: 'Charlotte' },
  { id: 17, name: 'Joseph' },
  { id: 18, name: 'Abigail' },
  { id: 19, name: 'Benjamin' },
  { id: 20, name: 'Grace' },
  { id: 21, name: 'Henry' },
  { id: 22, name: 'Ella' },
  { id: 23, name: 'Andrew' },
  { id: 24, name: 'Victoria' },
  { id: 25, name: 'Samuel' },
  { id: 26, name: 'Scarlett' },
  { id: 27, name: 'Christopher' },
  { id: 28, name: 'Lily' },
  { id: 29, name: 'Ethan' },
  { id: 30, name: 'Chloe' },
  { id: 31, name: 'Daniel' },
  { id: 32, name: 'Madison' },
  { id: 33, name: 'Joseph' },
  { id: 34, name: 'Zoe' },
  { id: 35, name: 'Anthony' },
  { id: 36, name: 'Hannah' },
  { id: 37, name: 'Joshua' },
  { id: 38, name: 'Elizabeth' },
  { id: 39, name: 'William' },
  { id: 40, name: 'Addison' },
  { id: 41, name: 'Andrew' },
  { id: 42, name: 'Natalie' },
  { id: 43, name: 'David' },
  { id: 44, name: 'Audrey' },
  { id: 45, name: 'James' },
  { id: 46, name: 'Samantha' },
  { id: 47, name: 'Christopher' },
  { id: 48, name: 'Avery' },
  { id: 49, name: 'Daniel' },
  { id: 50, name: 'Mia' },
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
  { id: 3, name: 'David' },
  { id: 4, name: 'Emily' },
  { id: 5, name: 'Michael' },
  { id: 6, name: 'Olivia' },
  { id: 7, name: 'William' },
  { id: 8, name: 'Sophia' },
  { id: 9, name: 'James' },
  { id: 10, name: 'Emma' },
  { id: 11, name: 'Alexander' },
  { id: 12, name: 'Ava' },
  { id: 13, name: 'Daniel' },
  { id: 14, name: 'Isabella' },
  { id: 15, name: 'Matthew' },
  { id: 16, name: 'Charlotte' },
  { id: 17, name: 'Joseph' },
  { id: 18, name: 'Abigail' },
  { id: 19, name: 'Benjamin' },
  { id: 20, name: 'Grace' },
  { id: 21, name: 'Henry' },
  { id: 22, name: 'Ella' },
  { id: 23, name: 'Andrew' },
  { id: 24, name: 'Victoria' },
  { id: 25, name: 'Samuel' },
  { id: 26, name: 'Scarlett' },
  { id: 27, name: 'Christopher' },
  { id: 28, name: 'Lily' },
  { id: 29, name: 'Ethan' },
  { id: 30, name: 'Chloe' },
  { id: 31, name: 'Daniel' },
  { id: 32, name: 'Madison' },
  { id: 33, name: 'Joseph' },
  { id: 34, name: 'Zoe' },
  { id: 35, name: 'Anthony' },
  { id: 36, name: 'Hannah' },
  { id: 37, name: 'Joshua' },
  { id: 38, name: 'Elizabeth' },
  { id: 39, name: 'William' },
  { id: 40, name: 'Addison' },
  { id: 41, name: 'Andrew' },
  { id: 42, name: 'Natalie' },
  { id: 43, name: 'David' },
  { id: 44, name: 'Audrey' },
  { id: 45, name: 'James' },
  { id: 46, name: 'Samantha' },
  { id: 47, name: 'Christopher' },
  { id: 48, name: 'Avery' },
  { id: 49, name: 'Daniel' },
  { id: 50, name: 'Mia' }, 
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
  { id: 3, name: 'David' },
  { id: 4, name: 'Emily' },
  { id: 5, name: 'Michael' },
  { id: 6, name: 'Olivia' },
  { id: 7, name: 'William' },
  { id: 8, name: 'Sophia' },
  { id: 9, name: 'James' },
  { id: 10, name: 'Emma' },
  { id: 11, name: 'Alexander' },
  { id: 12, name: 'Ava' },
  { id: 13, name: 'Daniel' },
  { id: 14, name: 'Isabella' },
  { id: 15, name: 'Matthew' },
  { id: 16, name: 'Charlotte' },
  { id: 17, name: 'Joseph' },
  { id: 18, name: 'Abigail' },
  { id: 19, name: 'Benjamin' },
  { id: 20, name: 'Grace' },
  { id: 21, name: 'Henry' },
  { id: 22, name: 'Ella' },
  { id: 23, name: 'Andrew' },
  { id: 24, name: 'Victoria' },
  { id: 25, name: 'Samuel' },
  { id: 26, name: 'Scarlett' },
  { id: 27, name: 'Christopher' },
  { id: 28, name: 'Lily' },
  { id: 29, name: 'Ethan' },
  { id: 30, name: 'Chloe' },
  { id: 31, name: 'Daniel' },
  { id: 32, name: 'Madison' },
  { id: 33, name: 'Joseph' },
  { id: 34, name: 'Zoe' },
  { id: 35, name: 'Anthony' },
  { id: 36, name: 'Hannah' },
  { id: 37, name: 'Joshua' },
  { id: 38, name: 'Elizabeth' },
  { id: 39, name: 'William' },
  { id: 40, name: 'Addison' },
  { id: 41, name: 'Andrew' },
  { id: 42, name: 'Natalie' },
  { id: 43, name: 'David' },
  { id: 44, name: 'Audrey' },
  { id: 45, name: 'James' },
  { id: 46, name: 'Samantha' },
  { id: 47, name: 'Christopher' },
  { id: 48, name: 'Avery' },
  { id: 49, name: 'Daniel' },
  { id: 50, name: 'Mia' }
];