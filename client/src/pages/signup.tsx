import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineClose } from 'react-icons/ai';
import { userRegister, editUser } from '@/redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userschema } from '@/validation';
import { RootState } from '@/redux/store';

interface IFormInputs {
  firstName: string;
  surname: string;
  age?: string;
  email: string;
  phone_number?: string;
  password: string;
}

interface ItemProp {
  onClose: () => void;
  role?: "student" | "admin";
  type?: "add" | "edit";
}

const SignUp: React.FC<ItemProp> = ({ onClose, role, type = "add" }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInputs>({
    resolver: zodResolver(userschema),
  });

  // Pre-fill the form if in edit mode
  useEffect(() => {
    if (type === "edit" && user) {
      setValue('firstName', user.firstName);
      setValue('surname', user.surname);
      setValue('age', user?.age);
      setValue('email', user.email);
      setValue('phone_number', user.phone_number);
      setValue('password', user.password); // Consider hiding or modifying this in actual applications
    }
  }, [type, user, setValue]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const finalData = { ...data, role };
    if (type === "add") {
      dispatch(userRegister(finalData));
    } else {
      dispatch(editUser({ newData:finalData, id: user._id })); // Assuming `user.id` is available
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-700 hover:text-gray-900">
          <AiOutlineClose size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-center">
          {type === "add" ? "Student Signup" : "Edit Account"}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="firstName">First Name</label>
            <input
              {...register('firstName')}
              className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded`}
              type="text"
              id="firstName"
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="surname">Surname</label>
            <input
              {...register('surname')}
              className={`w-full p-2 border ${errors.surname ? 'border-red-500' : 'border-gray-300'} rounded`}
              type="text"
              id="surname"
              placeholder="Enter your surname"
            />
            {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="age">Age</label>
            <input
              {...register('age')}
              className={`w-full p-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded`}
              type="text"
              id="age"
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              {...register('email')}
              className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="phoneNumber">Phone Number (Optional)</label>
            <input
              {...register('phone_number')}
              className={`w-full p-2 border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} rounded`}
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
            />
            {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              {...register('password')}
              className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" type="submit">
            {type === "add" ? "Signup" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
