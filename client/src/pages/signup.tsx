import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineClose } from 'react-icons/ai';

interface IFormInputs {
  firstName: string;
  surname: string;
  age?: number; // Age is optional
  email: string;
  phoneNumber?: string; // Phone number is optional
}

interface ItemProp {
  onClose: () => void;
  role:"student"|"teacher"|"admin"
}

// Define the schema using Zod
const schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  age: z.number().min(1, 'Age must be at least 1').optional(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phoneNumber: z
  .string()
    .regex(/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits')
    .optional(),
});

const SignUp: React.FC<ItemProp> = ({ onClose , role}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const finaldata = {...data, role}
    console.log(finaldata) // Handle the form submission, e.g., send to API
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-700 hover:text-gray-900">
          <AiOutlineClose size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name Field */}
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

          {/* Surname Field */}
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

          {/* Age Field */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="age">Age (Optional)</label>
            <input
              {...register('age', { valueAsNumber: true })}
              className={`w-full p-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded`}
              type="number"
              id="age"
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
          </div>

          {/* Email Field */}
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

          {/* Phone Number Field */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="phoneNumber">Phone Number (Optional)</label>
            <input
              {...register('phoneNumber')}
              className={`w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" type="submit">
            Register
          </button>
        </form>
        
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
