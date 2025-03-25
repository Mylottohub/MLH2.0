import { useQuery } from "@tanstack/react-query";
import queryKeys from "../constants";
import { HTTP } from "../../utils";
import { useSelector } from "react-redux";

const getInstantGame = async (token) => {
  try {
    const res = await HTTP.get(`/user/get-instantgames `, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

const useGetInstantGame = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const token = userInfo?.token;
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_INSTANT_GAME],
    queryFn: () => getInstantGame(token),
  });

  return {
    userInstantGame: data?.data?.data,
    token,
    isLoadingInstantGame: isLoading,
  };
};

export default useGetInstantGame;
