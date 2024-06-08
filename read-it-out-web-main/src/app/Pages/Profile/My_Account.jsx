import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  ApiGet,
  ApiPostNoAuth,
  ApiPut,
  ApiUpload,
  Bucket,
} from "../../helpers/API/ApiData";
import editPhoto from "../../media/editPhoto.png";
import userPhoto from "../../media/user.png";
import * as userUtil from "../../utils/user.util";
import { FiEdit } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionType } from "../../store/constants/actionType";
import {
  loginUser,
  updateUser,
  updateUserProfileImage,
  updateUserProfileName,
} from "app/store/action/action";
import moment from "moment";

const My_Account = () => {
  const [loading, setLoading] = useState(false);
  const [button, setbutton] = useState(false);
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const [images, setImage] = useState([]);
  console.log("images", images);
  const [countrylist, setcountrylist] = useState([]);
  const [regionlist, setregionlist] = useState([]);
  const [citylist, setcitylist] = useState([]);
  const [count, setCount] = useState(100);
  const handleImage = (e) => {};
  const dispatch = useDispatch();

  const handleProfile = (e) => {
    let { name, value } = e.target;
    if (name == "country") {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
        region: "",
        // cityId: "",
        // region: "",
        // city: "",
      }));

      callfilter(value);
    } else if (name == "region") {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
        cityId: "",
        city: "",
      }));
      callfilter1(value);
    } else if (name == "image") {
      let file = e.target.files[0];

      let fileURL = URL.createObjectURL(file);
      file.fileURL = fileURL;
      // }
      setImage([file]);
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setCount(count + 1);
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const callfilter = async (i) => {
    let body = {
      country_name: i,
    };

    ApiPostNoAuth("student/get_country_state_city", body)
      .then((res) => {
        setregionlist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          // history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };
  const callfilter1 = async (i) => {
    let body = {
      country_name: data.country,
      state_name: i,
    };
    ApiPostNoAuth("student/get_country_state_city", body)
      .then((res) => {
        setcitylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          // history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };
  const userUtilJSON = localStorage.getItem("userinfo");
  const userUtil = JSON.parse(userUtilJSON);
  const currentDate = moment().utc().startOf("day");
  const userUtilJSON1 = sessionStorage.getItem("userUtil");
  const userUtil1 = JSON.parse(userUtilJSON1);

  const getProfile = async () => {
    ApiGet(`/${userUtil?.id || userUtil1?.id}`)
      .then((res) => {
        console.log("res", res);
        setData(res.data.data);
        setImage([res.data.data.image]);
        callfilter(res.data.data.country);
        callfilter1(res.data.data.regionId);
        let body = {
          country_name: res.data.data.country,
        };
        // if (data.country) body.country_name = data.country;

        ApiPostNoAuth("student/get_country_state_city", body)
          .then((res) => {
            setregionlist(res.data.data);

            // setCategory(res.data.data);
          })
          .catch((err) => {
            if (err.status == 410) {
              // history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
        // res.data.data.find((obj) => {
        //
        //   // return obj.country === data.countryId;
        // });
        //
      })
      .catch((err) => {
        if (err.status == 410) {
          // history.push("/postlist");
        } else {
          // toast.error(err.message);
        }
      });
  };

  const uploadImage = async () => {
    let extraimage = [];

    for (let i = 0; i < images.length; i++) {
      if (images[i]?.fileURL) {
        const formData = new FormData();
        formData.append("image", images[i]);

        await ApiUpload("upload/profile_image", formData)
          .then((res) => {
            extraimage.push(res.data.data.image);
          })
          .catch((err) => {
            if (err.status == 410) {
              // history.push("/postlist");
            } else {
              toast.error(err.message);
            }
          });
      } else {
        extraimage.push(images[i]);
      }
    }

    return extraimage;
  };

  const onSubmit = async () => {
    setbutton(true);
    // enableLoading();
    const image = await uploadImage();

    const scity = citylist.find((obj) => {
      return obj._id === data.cityId;
    });

    const scountry = countrylist.find((obj) => {
      return obj._id === data.countryId;
    });

    const srigion = regionlist.find((obj) => {
      return obj._id === data.regionId;
    });

    const body = {
      name: data.name,
      // email: data.email,
      address: data.address,
      // city: scity.city ? scity.city :"",
      region: data.region,
      country: data.country,
      // phoneNumber: data.phoneNumber,
      PINCode: data.PINCode,
      image: image[0] ? image[0] : "",
      // cityId: data.cityId,
      // regionId: data.regionId,
      // countryId: data.countryId,
    };

    ApiPut("/profile", body)
      .then((res) => {
        // disableLoading();
        setbutton(false);
        userUtil.image = image[0];
        userUtil.name = data.name;
        localStorage.setItem("userinfo", JSON.stringify(userUtil));
        toast.success(res.data.message);
        dispatch(loginUser(body));
        // dispatch({
        //   type: ActionType.UPDATE_USER_PROFILE_IMAGE,
        //   payload: image[0],
        // });
        // dispatch(updateUserProfileName(data.name));
        // history.push("/book");
        // window.location.reload();
      })
      .catch((err) => {
        // disableLoading();
        setbutton(false);
        if (err.status == 410) {
          // history.push("/book");
        } else {
          // toast.error(err.message);
        }
      });
  };

  useEffect(async () => {
    await getProfile();
    let body = {};
    // if (data.country) body.country_name = data.country;

    ApiPostNoAuth("student/get_country_state_city", body)
      .then((res) => {
        setcountrylist(res.data.data);

        // setCategory(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          // history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  }, []);
  return (
    <div className="rounded box_shadow">
      <div className="bg-light-grey pt-25">
        <ToastContainer position="top-right" />
        <div className="">
          <div className="">
            {edit ? (
              <div className="row pb-30">
                <Row className="pb-3 border-bottom font_size_26 font_bold color_light_gray ">
                  Edit profile
                </Row>
                <Row className="pt-25">
                  <div className="d-flex justify-content-center">
                    <div className="col-md-3 position-reletive">
                      {data.accountType === 0 ? (
                        <>
                          <img
                            src={
                              images && images[0] === null
                                ? "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&amp;s=70"
                                : images[0]?.fileURL
                                ? images[0]?.fileURL
                                : Bucket + images[0]
                            }
                            alt=""
                            className="img-responsive rounded_1 "
                            width="100%"
                            height="200px"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={
                              images && images[0] === null
                                ? "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&amp;s=70"
                                : images[0]?.fileURL
                                ? images[0]?.fileURL
                                : Bucket + data?.image
                            }
                            alt=""
                            className="img-responsive rounded_1 "
                            width="100%"
                            height="200px"
                          />
                        </>
                      )}

                      <div className="position-absolute topBottom">
                        <input
                          accept="image/gif, image/jpeg, image/png"
                          name="image"
                          // value={data.image}
                          type="file"
                          id="profileImage"
                          hidden
                          onChange={handleProfile}
                        />
                        <label
                          htmlFor="file"
                          for="profileImage"
                          className="profileImage"
                        >
                          <FiEdit />
                        </label>
                      </div>
                    </div>
                  </div>
                </Row>
                <Row className="pt-40">
                  <div className="mb-3 d-flex flexColumn">
                    <div className="col-md-6 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={handleProfile}
                        // className=" loginInput login_Border rounded w-100"
                        className="form-control  loginInput login_Border w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="col-md-6 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                      >
                        Mobile number
                      </label>
                      <input
                        type="number"
                        value={data.phoneNumber}
                        name="phoneNumber"
                        onChange={handleProfile}
                        disabled
                        // className=" loginInput login_Border rounded w-100"
                        className="form-control loginInput login_Border w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>
                  <div className="mb-3 d-flex flexColumn">
                    <div className="col-md-9 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        value={data.address}
                        name="address"
                        onChange={handleProfile}
                        // className=" loginInput login_Border rounded w-100"
                        className="form-control loginInput login_Border w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter address"
                      />
                    </div>
                    <div className="col-md-3 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="PINCode"
                        value={data.PINCode}
                        onChange={handleProfile}
                        // className=" loginInput login_Border rounded w-100"
                        className="form-control loginInput login_Border w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter pincode"
                      />
                    </div>
                  </div>
                  <div className="mb-3 d-flex flexColumn">
                    <div className="col-md-4 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                      >
                        Country
                      </label>
                      <select
                        name="country"
                        onChange={(e) => handleProfile(e)}
                        value={data.country}
                        className=" loginInput1 login_Border  rounded w-100"
                        aria-label="Default select example"
                        id="exampleFormControlInput1"
                      >
                        <option value="" selected>
                          Select country
                        </option>
                        {countrylist.map((record, i) => {
                          return (
                            <option value={record.country}>
                              {record.country}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-4 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                      >
                        Region
                      </label>

                      <select
                        name="region"
                        onChange={(e) => handleProfile(e)}
                        value={data.region}
                        className=" loginInput1 login_Border  rounded w-100"
                        aria-label="Default select example"
                      >
                        <option value="" selected>
                          {data.region ? data.region : "Select region"}
                        </option>
                        {regionlist.map((record, i) => {
                          return (
                            <option value={record.state}>{record.state}</option>
                          );
                        })}
                      </select>
                    </div>
                    {/* <div className="col-md-4 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                      >
                        City
                      </label>
                      <select
                        name="cityId"
                        onChange={(e) => handleProfile(e)}
                        value={data.cityId}
                        // onChange={(e) => handleonChange(e)}
                        // value={main_categoryId}
                        className=" loginInput1 login_Border  rounded w-100"
                        aria-label="Default select example"
                      >
                        <option value="" selected>
                          Select City
                        </option>
                        {citylist.map((record, i) => {
                          return (
                            <option value={record._id}>{record.city}</option>
                          );
                        })}
                      </select>
                    </div> */}
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="col-md-6 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleProfile}
                        disabled
                        // className=" loginInput login_Border rounded w-100"
                        className="form-control loginInput login_Border w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter email address"
                      />
                    </div>
                    {/* <div className="col-md-6 px-2">
                      <label
                        for="exampleFormControlInput1"
                        className=" font_size_16 font_bold color_gray mb-1 font-weight-normal"
                      >
                        School Name
                      </label>
                      <input
                        type="text"
                        // className=" loginInput login_Border rounded w-100"
                        className="form-control loginInput login_Border w-100"
                        id="exampleFormControlInput1"
                        placeholder="Enter Mobile Number"
                      />
                    </div> */}
                  </div>
                  <div className="mb-3 pt-60  text-center">
                    <button
                      className=" viewAllBtn rounded px-3 py-2 pointer mr-2"
                      onClick={() => setEdit(!edit)}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={button}
                      className="rounded px-5 py-2 text-white font_bold linear_gradient pointer"
                      onClick={onSubmit}
                    >
                      {button ? (
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          {/* <span className="sr-only">Loading...</span> */}
                        </div>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </Row>
              </div>
            ) : (
              <div>
                <div className="row px-5 py-2">
                  <div className="col-md-3">
                    <img
                      src={
                        data.accountType === 0
                          ? data.image !== null || " "
                            ? Bucket + data?.image
                            : "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&amp;s=70"
                          : data.image !== null || " "
                          ? Bucket + data?.image
                          : "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&amp;s=70"
                      }
                      alt=""
                      className="rounded_1 img-responsive "
                      width="160px"
                      height="160px"
                    />
                  </div>
                  <div className="col-md-9 d-flex flex-column justify-content-between A_center">
                    <div className="profile-head">
                      <h5 className="font_size_20 font_bold color_light_gray">
                        {data.name}
                      </h5>
                      {/* <h6 className="pt-15">
                        Phasellus faucibus mollis pharetra. <br></br>Proin
                        blandit ac massa.
                      </h6> */}
                    </div>
                    <div className="d-flex pt-15">
                      <div className="col-md-4">
                        <button
                          className=" text-white font_bold rounded border-none pointer  py-2 linear_gradient W_100"
                          onClick={() => setEdit(!edit)}
                        >
                          Edit profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pt-60 pb-30">
                  <Row className="pb-3 border-bottom font_size_20 font_bold color_light_gray px-4">
                    Personal details
                  </Row>
                  <Row>
                    <Col md="12" className="">
                      <div className="d-flex pt-30 flexColumn">
                        <Col
                          md="3"
                          className="font_size_18 font_bold color_light_gray "
                        >
                          Address
                        </Col>{" "}
                        <Col className="font_size_16 font_medium color_blue ">
                          {data.address}
                        </Col>
                      </div>
                      <div className="d-flex pt-30 flexColumn">
                        <Col
                          className="font_size_18 font_bold color_light_gray "
                          md="3"
                        >
                          Mobile number
                        </Col>
                        <Col
                          md=""
                          className="font_size_16 font_medium color_blue "
                        >
                          {data.phoneNumber}
                        </Col>
                      </div>
                      <div className="d-flex pt-30 flexColumn">
                        <Col
                          className="font_size_18 font_bold color_light_gray "
                          md="3"
                        >
                          Email
                        </Col>
                        <Col
                          md=""
                          className="font_size_16 font_medium color_blue "
                        >
                          {data.email}
                        </Col>
                      </div>
                      <div className="d-flex pt-30 flexColumn">
                        <Col
                          className="font_size_18 font_bold color_light_gray "
                          md="3"
                        >
                          Subscription Remaining Days
                        </Col>
                        <Col
                          md=""
                          className="font_size_16 font_medium color_blue "
                        >
                          {data?.subscriptionExpDate
                            ? moment
                                .utc(data?.subscriptionExpDate)
                                .startOf("day")

                                .diff(currentDate, "days")
                            : 0}
                          &nbsp;Days
                        </Col>
                      </div>
                      <div className="d-flex pt-30 flexColumn">
                        <Col
                          className="font_size_18 font_bold color_light_gray "
                          md="3"
                        >
                          Account Registered On
                        </Col>
                        <Col
                          md=""
                          className="font_size_16 font_medium color_blue "
                        >
                          {moment(data?.createdAt).format("DD MMM YYYY")}
                        </Col>
                      </div>
                      <div className="d-flex pt-30 flexColumn">
                        <Col
                          className="font_size_18 font_bold color_light_gray "
                          md="3"
                        >
                          Account Expired On
                        </Col>
                        <Col
                          md=""
                          className="font_size_16 font_medium color_blue "
                        >
                          {moment(data?.isExp).format("DD MMM YYYY")}
                        </Col>
                      </div>
                      {/* <div className="d-flex pt-30 flexColumn">
                        <Col
                          className="font_size_18 font_bold color_light_gray "
                          md="3"
                        >
                          Facebook
                        </Col>
                        <Col
                          md=""
                          className="font_size_16 font_medium color_blue "
                        >
                          @Barry_Tech
                        </Col>
                      </div> */}
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default My_Account;
