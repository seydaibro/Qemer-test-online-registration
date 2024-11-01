export interface Ipermission {
  name: string;
  _id: string;
}
export interface IOptional {
  name: string;
  _id: string;
}

export interface ICourse {
  _id:string
  name: string;
  duration: number;
  imageUrl: string;
  studentsEnrolled:number
  description: string
  prerequisites:string
}

export interface IUser  {
  _id:string
  firstName: string;
  surname: string;
  age?: string; // Optional
  email: string;
  password: string;
  phone_number?: string; // Optional
  courses: ICourse[]; // Array of strings (course names or IDs)
  role: 'admin' | 'teacher' | 'student'; // Enum type for role
  permissions: Ipermission[]; 
  imageUrl:string
  // Array of ObjectIds referencing the Permission model
}
export interface Ipermission {
  name: string;
  _id: string;
}