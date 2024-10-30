import { publicAxios } from "../axios";
import { setAcessToken } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const response = await publicAxios.get("/refresh");
      console.log("response")
      if (response?.data) {
        console.log("refreshToken", response)
        dispatch(setAcessToken(response.data.accessToken));
        return response.data.accessToken;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return refresh;
};

export default useRefreshToken;
