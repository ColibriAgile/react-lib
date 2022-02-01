import { trackPromise } from "react-promise-tracker";

const isErro = (res) => {
  return res && !res.loading && res.status && [200, 201, 202, 204].indexOf(res.status) === -1;
};

const isSucesso = (res) => {
  return res && !res.loading && res.status && [200, 201, 202, 204].indexOf(res.status) > -1;
};

const isLoading = (res) => {
  return res && res.loading;
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
  return execRestRequest(client,{ url, method: "get" }, loading);
};

const del = (client, url, loading = true) => {
  return execRestRequest(client,{ url, method: "delete" }, loading);
};

const post = (client, url, data, loading = true) => {
  return execRestRequest(client,{ url, method: "post", data }, loading);
};

const put = (client, url, data, loading = true) => {
  return execRestRequest(client,{ url, method: "put", data }, loading);
};

const uploadBlob = (url, data, loading = true) => {
    return execRestRequest({
        url,
        method: "post",
        data,
        headers: {
            "Content-Type": `blob.type; boundary=${data._boundary}`,
        }
    }, loading);
}

const uploadFile = (url, data, loading = true, progress = null) => {
    return execRestRequest({
        url,
        method: "post",
        data,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progress
    }, loading);
}


export { isErro, isSucesso, isLoading, get, del, post, put, uploadFile, uploadBlob, execRestRequest };
