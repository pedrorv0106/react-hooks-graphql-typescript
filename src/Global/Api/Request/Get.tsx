import axios from "axios";

interface GetRequestParams {
  headers?: {};
  data: any;
  baseUrl?: string;
  url: string;
}

interface GetRequestResponse {
  error?: object;
  data?: any;
  status?: number;
}

const GetRequest = async ({
  headers,
  data,
  baseUrl,
  url,
}: GetRequestParams): Promise<GetRequestResponse> => {
  try {
    const Request = await axios({
      headers: {
        "content-type": "application/json",
        ...(headers || {}),
      },
      params: data,
      baseURL: baseUrl,
      method: "GET",
      url,
    });

    return {
      data: Request.data,
      status: Request.status,
    };
  } catch (err) {
    if (err?.response?.data) {
      return {
        error: err?.response?.data,
      };
    }

    return {
      error: { status: 500, message: "Internal Error" },
    };
  }
};

export default GetRequest;
