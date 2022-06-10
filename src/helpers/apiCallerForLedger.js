import { axiosInstance, tokenConfig } from "../constants";

export const apiCallerForLedger = async (url) => {
  try {
    const { data } = await axiosInstance.get(url, tokenConfig());

    // console.log(data?.FullName);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
