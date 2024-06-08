import { API } from "../../config/API/api.config";
import Auth from "../Auth";
import * as authUtil from "../../utils/auth.util";

// const Id = JSON.parse(localStorage.getItem("userinfo"));
// export let BaseURL = ""
// if(Id?.userType==1){
//    BaseURL = API.endpoint + "/admin" ;
// }else if(Id?.userType==3){
//    BaseURL = API.endpoint + "/sub_admin";
// }else if(Id?.userType==4){
//   BaseURL = API.endpoint + "/auditor";
// }else {
export const BaseURL = API.endpoint + "/";
// }

// export const Bucket = "http://103.86.177.17:5000/upload/"; previous code

export const Bucket = "http://localhost:3000/upload/"; //New Change
export const uploadURL = API.endpoint + "/";
const axios = require("axios").default;

const defaultHeaders = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
  api_key: true,
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
        // if (error.message === "Network Error"){
        //   reject(error)
        //         }
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
          reject(error.response.data);
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
          reject(error.response.data.error);
        } else {
          reject(error);
        }
      });
  });
};

export const ApiGet = (type) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 4) {
    ext = "auditor";
  } else if (Id?.userType == 3) {
    ext = "sub_admin";
  } else {
    ext = "";
  }

  return new Promise((resolve, reject) => {
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
      });
  });
};

export const ApiPost = (type, userData, AdditionalHeader) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 4) {
    ext = "auditor";
  } else if (Id?.userType == 3) {
    ext = "sub_admin";
  } else {
    ext = "";
  }
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + ext + type, userData, {
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
      });
  });
};

export const ApiPut = (type, userData) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 4) {
    ext = "auditor";
  } else if (Id?.userType == 3) {
    ext = "sub_admin";
  } else {
    ext = "";
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

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 4) {
    ext = "auditor";
  } else if (Id?.userType == 3) {
    ext = "sub_admin";
  } else {
    ext = "";
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
          reject(error?.response?.data);
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
          reject(error.response.data.error);
        } else {
          reject(error);
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

export const ApiGetInce = (type, tokan) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 4) {
    ext = "auditor";
  } else if (Id?.userType == 3) {
    ext = "sub_admin";
  } else {
    ext = "";
  }
  return new Promise((resolve, reject) => {
    fetch(BaseURL + ext + type, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const body = await response.json();
          return body;
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
export const ApiDeleteInce = (type, tokan, body) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 4) {
    ext = "auditor";
  } else if (Id?.userType == 3) {
    ext = "sub_admin";
  } else {
    ext = "";
  }
  return new Promise((resolve, reject) => {
    fetch(BaseURL + ext + type, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },

      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.ok) {
          const body1 = await response.json();
          return body1;
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
export const ApiPutInce = (type, tokan, body) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 4) {
    ext = "auditor";
  } else if (Id?.userType == 3) {
    ext = "sub_admin";
  } else {
    ext = "";
  }
  return new Promise((resolve, reject) => {
    fetch(BaseURL + ext + type, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },

      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.ok) {
          const body1 = await response.json();
          return body1;
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
export const ApiPostInce = (type, tokan, body) => {
  const Id = JSON.parse(localStorage.getItem("userinfo"));
  let ext = "";

  if (Id?.userType == 1) {
    ext = "admin";
  } else if (Id?.userType == 4) {
    ext = "auditor";
  } else if (Id?.userType == 3) {
    ext = "sub_admin";
  } else {
    ext = "";
  }
  return new Promise((resolve, reject) => {
    fetch(BaseURL + ext + type, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        authorization: tokan,
      },

      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.ok) {
          const body1 = await response.json();
          return body1;
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
    headers["authorization"] = authUtil.getToken();
    headers["Cache-Control"] = "no-cache";
  }

  if (options.hasOwnProperty("api_key") && options.api_key) {
    headers["api_key"] = "6QSy49rUTH";
  }
  if (options.hasOwnProperty("isJsonRequest") && options.isJsonRequest) {
    headers["Content-Type"] = "application/json";
  }

  if (options.hasOwnProperty("AdditionalParams") && options.AdditionalParams) {
    headers = { ...headers, ...options.AdditionalParams };
  }

  return { headers };
};
