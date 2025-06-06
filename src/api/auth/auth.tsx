import AxiosDefault from "../../services/AxiosDefault";

type RequestData = {
  email: string;
  password: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: any;
};

export const PostSignin = async (data: RequestData): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/login",
    method: "POST",
    data: data,
    contentType: "application/json",
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};

export const PostSignUp = async (data: any): Promise<ApiResponse> => {
  const response = await AxiosDefault({
    url: "/api/v1/auth/register",
    method: "POST",
    data: data,
    contentType: "multipart/form-data",
  });
  const responseData: ApiResponse = response.data;
  return responseData;
};
