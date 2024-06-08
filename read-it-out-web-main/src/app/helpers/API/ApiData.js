import { API } from "../../config/API/api.config";
import * as authUtil from "../../utils/auth.util";
import Auth from "../Auth";
// import AWS from "aws-sdk";
export const BaseURL = API.endpoint + "/";
// export const Bucket = "https://api.elibrarysmartcityadmin.education/root/files/readitout-backedend/upload/";
export const Bucket = "http://localhost:3000/upload/";

export const uploadURL = API.endpoint + "/";
const axios = require("axios").default;
const defaultHeaders = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
};
export const ApiPostNoAuth = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        BaseURL + type,
        userData,
        getHttpOptions({ ...defaultHeaders, isAuth: false })
      )
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        console.log("ApiPostNoAuth_error", error);
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          console.log(error.response?.data);
          reject(error.response?.data);
        } else {
          reject(error.response?.data);
        }
        if (error?.response?.data?.status === 401) {
          localStorage.clear();
        }
      });
  });
};
export const ApiGetNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHttpOptions({ ...defaultHeaders, isAuth: false }))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error?.response?.data);
        }
        if (error?.response?.data?.status === 401) {
          localStorage.clear();
        }
      });
  });
};
export const Api = (type, methodtype, userData) => {
  return new Promise((resolve, reject) => {
    userData = userData || {};
    axios({
      url: BaseURL + type,
      headers: getHttpOptions(),
      data: userData,
      type: methodtype,
    })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
        if (error?.response?.data?.status === 401) {
          localStorage.clear();
        }
      });
  });
};
export const ApiGet = (type) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";
  if (Id?.userType === 2) {
    ext = "student";
  } else if (Id?.userType === 0) {
    ext = "teacher";
  } else {
    ext = "student";
  }
  return new Promise((resolve, reject) => {
    // console.log(getHttpOptions());
    axios
      .get(BaseURL + ext + type, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response?.data);
        }
        // if (error.response.data.status === 401) {
        //   localStorage.clear();
        // }
      });
  });
};
export const ApiPost = (type, userData) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";
  if (Id?.userType === 2) {
    ext = "student";
  } else if (Id?.userType === 0) {
    ext = "teacher";
  } else {
    ext = "student";
  }
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + ext + type, userData, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        console.log("ApiPost_error", error.data);

        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.data);
        }
        // if (error.response.data.status === 401) {
        //   localStorage.clear();
        // }
      });
  });
};
export const ApiUpload = (type, userData, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .post(uploadURL + type, userData, {
        ...getHttpOptions(),
        ...AdditionalHeader,
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
        // if (error.response.data.status === 401) {
        //   localStorage.clear();
        // }
      });
  });
};
// export const deleteImage = (params) {
//   return new Promise((resolve, reject) {
//       try {
//           await s3.deleteObject(params, function (err, data) {
//               if (err) {
//                   console.log(err)
//                   reject(err)
//               } else {
//                   logger.info("File successfully delete")
//                   resolve("File successfully delete")
//               }
//           })
//       } catch (error) {
//           console.log(error)
//           reject()
//       }
//   })
// }
export const ApiPut = (type, userData) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";
  if (Id?.userType === 2) {
    ext = "student";
  } else if (Id?.userType === 0) {
    ext = "teacher";
  } else {
    ext = "student";
  }
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + ext + type, userData, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};
export const ApiPatch = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(BaseURL + type, userData, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};
export const ApiDelete = (type, userData) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";
  if (Id?.userType === 2) {
    ext = "student";
  } else if (Id?.userType === 0) {
    ext = "teacher";
  } else {
    ext = "student";
  }
  return new Promise((resolve, reject) => {
    axios
      .delete(BaseURL + ext + type, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};
export const ApiDownload = (type, userData) => {
  let method = userData && Object.keys(userData).length > 0 ? "POST" : "GET";
  return new Promise((resolve, reject) => {
    axios({
      url: BaseURL + type,
      method,
      headers: getHttpOptions().headers,
      responseType: "blob",
      data: userData,
    })
      .then((res) => resolve(new Blob([res.data])))
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};
export const ApiGetBuffer = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.buffer();
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
export const Logout = () => {
  return ApiPost("/accounts/logout", {});
};
export const getHttpOptions = (options = defaultHeaders) => {
  let headers = {};
  if (options.hasOwnProperty("isAuth") && options.isAuth) {
    // console.log(headers["Authorization"]);
    headers["Cache-Control"] = "no-cache";
    headers["authorization"] = authUtil.getToken();
    // console.log(headers);
  }
  if (options.hasOwnProperty("isJsonRequest") && options.isJsonRequest) {
    headers["Content-Type"] = "application/json";
    // console.log(headers);
  }
  if (options.hasOwnProperty("AdditionalParams") && options.AdditionalParams) {
    headers = { ...headers, ...options.AdditionalParams };
    // console.log(headers);
  }
  // headers["Access-Control-Allow-Origin"] = "*"
  /* setting appId as default */
  // headers['appid'] = 'hummz';
  // console.log(headers);
  return { headers };
};
