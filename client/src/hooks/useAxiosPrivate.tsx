import { privateAxios } from "./../axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const useAxiosPrivate = () => {
    const { accessToken } = useSelector((state:RootState) => state.auth)
    console.log(accessToken)
    const refresh = useRefreshToken();
    useEffect(() => {
        const requestIntercept = privateAxios.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = privateAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const accessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return privateAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateAxios.interceptors.request.eject(requestIntercept);
            privateAxios.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh])

    return privateAxios;
}

export default useAxiosPrivate;