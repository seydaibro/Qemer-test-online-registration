export interface Ipermission {
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


export interface IOptional {
  name: string;
  _id: string;
}

