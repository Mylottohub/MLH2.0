import { useQuery } from "@tanstack/react-query";
import queryKeys from "../constants";
import { HTTP } from "../../utils";

const getSavedUserCoupon = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  let schUrl = urlParams.get("schUrl");
  let schUser = urlParams.get("user");

  try {
    const res = await HTTP.post(`/resource/usecoupon/${schUrl}/${schUser}`);
    return res;
  } catch (error) {
    return error;
  }
};

const checkSavedCoupon = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  let schUrl = urlParams.get("schUrl");
  let schUser = urlParams.get("user");

  try {
    const res = await HTTP.post(`/resource/trackcoupon/${schUrl}/${schUser}`);
    return res;
  } catch (error) {
    return error;
  }
};

const useSavedUserCoupon = () => {
  const { data, isLoading } = useQuery(
    [queryKeys.GET_SAVED_USER_COUPON],
    getSavedUserCoupon
  );
  return {
    savedUserCoupon: data?.data,
    isLoadingSavedCoupon: isLoading,
  };
};

const useCheckUserCoupon = () => {
  const { data, isLoading } = useQuery(
    [queryKeys.GET_CHECKED_COUPON],
    checkSavedCoupon
  );
  return {
    checkCoupon: data?.data,
    isLoadingCheckCoupon: isLoading,
  };
};

export { useSavedUserCoupon, useCheckUserCoupon, getSavedUserCoupon };
