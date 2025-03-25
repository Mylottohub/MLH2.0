import { useQuery } from "@tanstack/react-query";
import queryKeys from "../constants";
import { HTTP } from "../../utils";
import { useSelector } from "react-redux";

const useAllSportsForecast = async (token) => {
  try {
    const res = await HTTP.get(`/get-sportoperator`, {
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

const useAllGetSportsForecast = () => {
  const userInfo = useSelector((state) => state?.auth?.userInfo);
  const token = userInfo?.token?.accessToken;

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_All_SPORT_FORECAST],
    queryFn: () => useAllSportsForecast(token),
  });

  return {
    userAllSportForecast: data?.data?.data,
    token,
    isLoadingAllSportForecast: isLoading,
  };
};

export default useAllGetSportsForecast;
