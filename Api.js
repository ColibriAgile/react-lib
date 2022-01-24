import { trackPromise } from "react-promise-tracker";

const isErro = (res) => {
  return res && !res.loading && res.status && [200, 201, 202, 204].indexOf(res.status) === -1;
};

const isSucesso = (res) => {
  return res && !res.loading && res.status && [200, 201, 202, 204].indexOf(res.status) > -1;
};

const execRestRequest = async (client, request, loading) => {
  const doRequest = async (request) => {
    try {
      return await client(request);
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 401) {
        window.location.href = "/";
      }
      return error.response;
    }
  };

  if (loading) {
    return trackPromise(doRequest(request));
  }
  return doRequest(request);
};

const get = async (client, url, loading = true) => {
  let result = await execRestRequest(client,{ url, method: "get" }, loading);
  if (isSucesso(result)) {
    return result.data;
  } else {
    throw result;
  }
};

const del = (url, loading = true) => {
  return execRestRequest({ url, method: "delete" }, loading);
};

const post = (url, data, loading = true) => {
  return execRestRequest({ url, method: "post", data }, loading);
};

const put = (url, data, loading = true) => {
  return execRestRequest({ url, method: "put", data }, loading);
};

export { isErro, isSucesso, get, del, post, put, execRestRequest };
