import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInShcema } from "@/validation";
import { reset, userLogin } from "@/redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import ButtonLoading from "@/components/ButtonLoading";
const SignIn = () => {
  const { user, token, error, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors},
  } = useForm<z.infer<typeof signInShcema>>({
    resolver: zodResolver(signInShcema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    setValue("username", "");
    setValue("password", "");
    dispatch(reset())
  }, []);
  const onSubmit: SubmitHandler<z.infer<typeof signInShcema>> = async (
    data
  ) => {
   
    try {
      dispatch(userLogin(data));
      console.log("loginData", data)
      navigate("/");
      console.log("login buttun is pressed")
    } catch (error) {
      
    }
  };
 
  useEffect(() => {
    if (user && token) {
      navigate("/");
    }
  }, [user, token, navigate]);

  return (
    <div className="h-screen    m-auto w-full flex  justify-center items-center">
      <div className="bg-gradient-to-t from-[#7579ff] to-[#b224ef] text-white h-full md:h-[80vh] w-full md:w-[30%] rounded-md flex flex-col items-center px-6 py-10 ">
        <div className="mb-4 text-[60px] text-[#333333] flex justify-center items-center w-[120px] h-[120px] rounded-full bg-white mx-auto">
          <img src="./assets/icons/pawe1.png" />
        </div>
        <div>
          <p className="text-xl capitalize">Welcome</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-[80%] w-[90%] ">
          <div className="border-b flex flex-col  w-full py-1 mb-2 mt-8  text-white ">
            <input
              className="outline-none w-full placeholder:text-white text-white  active:outline-none bg-transparent border-none focus:bg-transparent focus:border-none focus:outline-none"
              {...register("username", {
                required: "Brand is required",
              })}
              autoComplete="off"
              placeholder="username"
            />
          </div>
          {errors.username && (
            <span className="text-red text-sm">{errors.username.message}</span>
          )}
          <div className="border-b flex flex-col  w-full py-1 mb-2 mt-8  text-white ">
            <input
              type="password"
              className="outline-none w-full  placeholder:text-white  bg-transparent border-none focus:bg-transparent focus:border-none focus:outline-none"
              {...register("password", { required: "Category is required" })}
              placeholder="password"
              autoComplete="off"
            />
          </div>
          {errors.password && (
            <span className="text-red text-sm">{errors.password.message}</span>
          )}
          {error && <span className="text-red text-sm">{error}</span>}
          <button
            className="w-full bg-white text-gray-800 mt-8"
            type="submit"
            disabled={isLoading}>
            {isLoading ? <ButtonLoading /> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
