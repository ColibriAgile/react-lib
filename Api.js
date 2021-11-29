import axios from "axios";
import React, { useEffect, useState } from "react";
import { RequestContext } from "../context/RequestContext";
import { InvContext } from "../context/InvContext";
import { trackPromise } from "react-promise-tracker";

const axiosApi = axios.create({
  baseURL: "/inv/api",
  responseType: "json",
});

const axiosApiCloud = axios.create({
  baseURL: "/",
  responseType: "json",
});

const isErro = (res) => {
  return res && !res.loading && res.status && [200, 201, 202, 204].indexOf(res.status) === -1;
};

const isSucesso = (res) => {
  return res && !res.loading && res.status && [200, 201, 202, 204].indexOf(res.status) > -1;
};

const isLoading = (res) => {
  return res && res.loading != null && res.loading;
};

const initalState = { data: null, error: null, loading: null, status: null };

const useRestAPI = (showLoading = false) => {
  const { reqDispatcher } = React.useContext(RequestContext);
  const { ctx } = React.useContext(InvContext);
  const [res, setRes] = useState(initalState);
  const [req, setReq] = useState();
  const cancelToken = React.useRef({});

  const clean = () => {
    setRes(initalState);
  };

  //api request
  useEffect(() => {
    const efetuarRequest = async () => {
      if (!req) return;
      cancelToken.current = axios.CancelToken.source();
      req["CancelToken"] = cancelToken.current.token;
      if (req.data && ctx.rede) {
        req.data = { ...req.data, redeId: ctx.rede.id };
      }
      try {
        setRes({ data: null, error: null, loading: true });
        let result;
        //api do cloud
        if (req.url.includes("restful")) {
          result = await axiosApiCloud(req);
          //api do inventario
        } else {
          result = await axiosApi(req);
        }
        let data = result.data;
        setRes({ data, error: null, loading: false, status: result.status });
      } catch (error) {
        setRes({
          data: error?.response?.data,
          error,
          loading: false,
          status: error?.response?.status,
        });
      }
    };
    efetuarRequest();
  }, [req]); // eslint-disable-line

  //erro
  useEffect(() => {
    const tratarErro = (error) => {
      console.error(error);
      if (error?.response?.status === 401) {
        window.location.href = "/";
      }
    };
    if (res && res.error) {
      tratarErro(res.error);
    }
  }, [res]);

  //request count
  useEffect(() => {
    const requestCount = (res) => {
      if (showLoading && res.loading) {
        reqDispatcher({ type: "startRequest" });
      }
    };
    if (res && res.loading != null) {
      requestCount(res);
    }
    return function cleanup() {
      if (showLoading && res && res.loading) {
        reqDispatcher({ type: "finishRequest" });
        if (cancelToken.current) {
          cancelToken.current.cancel();
        }
      }
    };
  }, [showLoading, res, reqDispatcher]);

  return [res, setReq, clean];
};

const execRestRequest = async (request, loading) => {
  const doRequest = async (request) => {
    try {
      if (request.url.includes("restful")) {
        return await axiosApiCloud(request);
      }
      return await axiosApi(request);
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

const get = async (url, loading = true) => {
  let result = await execRestRequest({ url, method: "get" }, loading);
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

export { useRestAPI, isErro, isSucesso, isLoading, get, del, post, put, execRestRequest };
