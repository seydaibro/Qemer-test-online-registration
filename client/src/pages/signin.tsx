import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInShcema } from "@/validation";
import { reset, userLogin } from "@/redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import ButtonLoading from "@/components/ButtonLoading";
import { IoClose } from "react-icons/io5";
interface SignInProps {
  onClose: () => void;
}

const SignIn = ({ onClose }: SignInProps) => {
  const { user, token, error, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  console.log("user", user, "token", token);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof signInShcema>>({
    resolver: zodResolver(signInShcema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
    dispatch(reset());
  }, [dispatch, setValue]);

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  const hideOnClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
    onClose()
    }
  };
  const onSubmit: SubmitHandler<z.infer<typeof signInShcema>> = async (
    data
  ) => {
    try {
      console.log("data", data);
      dispatch(userLogin(data));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (user && token) {
      navigate("/");
      onClose();
    }
  }, [user, token, navigate, !error, !isLoading]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative" ref={ref}>
        <button
          className="absolute top-6 right-6 text-gray-900 border border-gray-300 rounded-full p-1 hover:bg-gray-200 transition"
          onClick={onClose}
        >
          <IoClose size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="border rounded w-full p-2"
                  placeholder="Email"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="border rounded w-full p-2"
                  placeholder="Password"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white rounded p-2 w-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoading /> : "Sign In"}
          </button>
        </form>
        <div>{error && <span className="text-sm text-red text-center">{error }</span>}</div>
      </div>
    </div>
  );
};

export default SignIn;
