import { useQuery } from "@tanstack/react-query";
import queryKeys from "../constants";
import { HTTP } from "../../utils";

const getSavedResource = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  let schUrl = urlParams.get("schUrl");

  try {
    const res = await HTTP.get(
      `/resource/getSavedResource/${schUrl}`
    );
    return res;
  } catch (error) {
    return error;
  }
};

const useSavedResourceCategory = () => {
  const { data, isLoading } = useQuery(
    [queryKeys.GET_SAVED_RESOURCE_CATEGORY],
    getSavedResource
  );
  return {
    savedResourceResponse: data?.data,
    isLoadingSavedResource: isLoading,
  };
};
export default useSavedResourceCategory;
