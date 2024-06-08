import React, { useState, useEffect } from "react";
// import { Form } from "react-formio";
import { useHistory, Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import {
  ApiPost,
  ApiGet,
  ApiPut,
  ApiDelete,
} from "../../../helpers/API/ApiData";
// import * as CountryCode from "../../../helpers/CountryCode.json";
import queryString from "query-string";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import CreateIcon from "@material-ui/icons/Create";
import * as moment from "moment";
import {
  Col,
  Container,
  CardBody,
  Card,
  Row,
  FormText,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const position = {
  maxWidth: "1322px",
  marginTop: "0px",
  marginBottom: "2%",
};
export default function SellerCreate() {
  const history = useHistory();

  // var CountryValue =CountryCode.Data

  const [accountData, setaccountData] = useState(null);
  const [sellerProductDetails, setProductDetails] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [Responded, setResponded] = useState(null);
  const [endprice, setendprice] = useState(null);
  const [feedBack, setfeedback] = useState(null);
  const [sellerProductOrderDetails, setProductOrderDetails] = useState(null);
  const [selectedOrderCategory, setSelectedOrderCategory] = useState("pending");
  const [userInfo, setUserInfo] = useState({});
  const [errors, setError] = useState({});
  const [mobilityData, setmobilityData] = useState([]);
  const [extra, setArrey] = useState({});
  const [ID1, setID] = useState("");
  const [deleteflag, setdeleteflag] = useState(false);

  // console.log("accountData", sellerProductDetails, sellerProductOrderDetails);
  const download = () => {
    let name = sellerProductDetails.title;
    let a = document.createElement("a");
    let url = sellerProductDetails.sourceFile;
    a.href = url;
    a.setAttribute("download", name);
    a.click();
  };
  var sellerId;
  const deletepost = () => {
    ApiDelete("post/" + ID1)
      .then((res) => {
        // handleClose2();
        history.push("/reportlist");
        toast.success(res.data.message);
        setTimeout(function() {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/postlist");
        } else {
          toast.error(err.message);
        }
      });
  };
  const fetchData = async (id) => {
    // const Id2 = JSON.parse(localStorage.getItem("token"));
    // console.log(Id2)
    // let productValue = await ApiGet("admin/book/" + id);
    // let bookDetails = await ApiGet("admin/book/" + id);
    let bookDetails = await ApiGet("admin/main_category/" + id);
    // console.log("admin/book/" + id);
    // console.log("productValue", productValue);
    console.log(bookDetails.data.data);
    bookDetails = bookDetails.data.data;
    console.log(bookDetails);
    // productValue = productValue.data.data.post_data[0];
    // console.log(productValue);
    if (bookDetails.createdBy) {
      setaccountData(bookDetails.createdBy);
      console.log(accountData);
    } else {
      setaccountData(null);
    }

    if (bookDetails) {
      setBookDetails(bookDetails);
      console.log(bookDetails);
    } else {
      setBookDetails(null);
    }
    // if (productValue) {
    //   setProductDetails(productValue);
    // } else {
    //   setProductDetails(null);
    // }

    // if (productValue.software) {
    //   setResponded(productValue.software);
    // } else {
    //   setResponded(null);
    // }

    // if (productValue.tag) {
    //   setendprice(productValue.tag);
    // } else {
    //   setendprice(null);
    // }

    // if (productValue.image) {
    //   setfeedback(productValue.image);
    // } else {
    //   setfeedback(null);
    // }

    // if (productValue[0].storeDetails[0]) {
    //     sellerId = {

    //         storeId: productValue[0].storeDetails[0]._id,

    //     }
    // } else {
    //     sellerId = {

    //         storeId: null,

    //     }
    // }

    // setArrey(sellerId);
    // let productDetails = await ApiPost("get-sub-category-by-store-id", sellerId);

    // setProductDetails(productDetails.data.data);

    // console.log("productDetails", productDetails);

    // let productOrderDetails = await ApiPost("store-order-history-page", sellerId);

    // console.log("productOrderDetails", productOrderDetails);
    // setProductOrderDetails(productOrderDetails.data.data[0]);
    // getSubmission({ data: productValue[0] });
  };
  console.log(bookDetails);

  useEffect(() => {
    const idValue = queryString.parse(window.location.search);

    if (
      idValue.id ||
      !idValue.id === undefined ||
      !idValue.id === "undefined"
    ) {
      fetchData(idValue.id);
      setID(idValue.id);
      if (idValue.param) {
        setdeleteflag(true);
      }
    }
  }, []);

  const routerClick = async (id) => {
    console.log("Enter", id);
    // console.log(extra);
    history.push("/userReportDetails?id=" + id);
    // history.push("/seller/sellercreate?id=" + id.row._id);
  };

  const orderDetails =
    sellerProductOrderDetails &&
    sellerProductOrderDetails[selectedOrderCategory];

  return (
    <Container style={position}>
      <div style={position}>
        <Row>
          <Col md={12}>
            {/* <ToastContainer /> */}
            <Breadcrumb>
              {/* <BreadcrumbItem>
                                <Link to={"/dashboard"}>Home</Link>
                            </BreadcrumbItem> */}
              <BreadcrumbItem>
                <Link to={"/mainCategorylist"}>Main Category</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active> View</BreadcrumbItem>
            </Breadcrumb>
          </Col>

          <Col md={12}>
            <Card>
              <CardBody style={{ overflowX: "scroll" }}>
                <h2>
                  <b>Author Details</b>
                </h2>
                {/* <Row>
                  <Col >
                  Seller Details
                  </Col>
                </Row> */}
                <Row>
                  <Col style={{ minHeight: "80px" }}>
                    {/* {accountData ? ( */}
                    <Table>
                      <thead>
                        <tr>
                          <th>Main Category</th>
                          {/* <th>Author</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {/* {accountData ? ( */}
                        <tr>
                          {/* <td>{accountData && accountData.username}</td> */}
                          {/* <td>{accountData && accountData.email}</td> */}
                          <td>{bookDetails && bookDetails.name} </td>
                          {/* <td>{bookDetails && bookDetails.author} </td> */}
                        </tr>
                        {/* // ) : ( */}
                        {/* <tr>
                          <td>Loading...</td>
                        </tr> */}
                        {/* // )} */}
                      </tbody>
                    </Table>
                    {/* // ) : (<span style={{ lineHeight: "60px" }}>No Data</span> */}
                    {/* // )} */}
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <h2>
                      <b>Other Details</b>
                    </h2>
                  </Col>
                  <Col md={6}>
                    <h2>
                      <b>Tags</b>
                    </h2>
                  </Col>
                </Row>{" "}
                <Row>
                  <Col md={6} style={{ minHeight: "80px" }}>
                    {Responded ? (
                      <Table>
                        <thead>
                          <tr>
                            <th>Software </th>
                            <th>image</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Responded ? (
                            Responded.map((oder, i) => {
                              return (
                                <tr>
                                  <td width="50%">{oder.name}</td>
                                  <img
                                    style={{ height: "50px", width: "50px" }}
                                    src={oder.image}
                                  ></img>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td>Loading...</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    ) : (
                      <span style={{ lineHeight: "60px" }}>No Data</span>
                    )}
                  </Col>
                  <Col md={6} style={{ minHeight: "80px" }}>
                    {endprice ? (
                      <Table>
                        <thead>
                          <tr>
                            <th>Tags </th>
                          </tr>
                        </thead>
                        <tbody>
                          {endprice ? (
                            endprice.map((oder, i) => {
                              return (
                                <tr>
                                  <td width="20%">{oder}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td>Loading...</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    ) : (
                      <span style={{ lineHeight: "60px" }}>No Data</span>
                    )}
                  </Col>
                </Row>{" "}
                <Row>
                  <Col>
                    <h2>
                      <b>Image</b>
                    </h2>
                  </Col>
                </Row>{" "}
                <Row>
                  <Col style={{ minHeight: "80px" }}>
                    <Table>
                      <tbody>
                        <tr>
                          <td>{bookDetails && bookDetails.image}</td>
                        </tr>
                      </tbody>
                    </Table>
                    {/* <span style={{ lineHeight: "60px" }}>No Data</span> */}
                  </Col>
                </Row>{" "}
                {/* <Row>
                  <Col style={{ minHeight: "80px" }}>
                    {feedBack ? (
                      <Table>
                        <tbody>
                          {feedBack ? (
                            feedBack.map((oder, i) => {
                              return (
                                <img
                                  style={{ height: "100px", width: "100px" }}
                                  src={oder}
                                ></img>
                              );
                            })
                          ) : (
                            <tr>
                              <td>Loading...</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    ) : (
                      <span style={{ lineHeight: "60px" }}>No Data</span>
                    )}
                  </Col>
                </Row>{" "} */}
                {/* <Button onClick={() => download()}>Source File</Button>
                {deleteflag ? (
                  <Button onClick={() => deletepost()}>Delete</Button>
                ) : (
                  ""
                )} */}
                {/* <Row>
                                    <Col lg={3} md={3} sm={3}>

                                        <h2>
                                            <b style={{ whiteSpace: 'noWrap' }}> Seller Orders</b>
                                        </h2>
                                    </Col>
                                    <Col lg={3} md={3} sm={3}>
                                        {sellerProductOrderDetails && (
                                            <UncontrolledDropdown >
                                                <DropdownToggle caret>
                                                    {selectedOrderCategory.slice(0, 1).toUpperCase() + selectedOrderCategory.slice(1)}
                                                </DropdownToggle>

                                                <DropdownMenu >
                                                    {Object.keys(sellerProductOrderDetails).map((order, i) => {
                                                        return <DropdownItem onClick={() => setSelectedOrderCategory(order)} key={i}>
                                                            {order.slice(0, 1).toUpperCase() + order.slice(1)}
                                                        </DropdownItem>
                                                    })}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        )}

                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{ minHeight: "80px" }}>
                                        {orderDetails &&
                                            orderDetails.length ? (
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>Payment Method</th>
                                                            <th>Final Price</th>
                                                            <th>Cart Price</th>
                                                            <th>Commission</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderDetails ? (

                                                            orderDetails.map((oder, i) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{oder && oder.paymentMethod}</td>
                                                                        <td>{oder && oder.finalPrice}</td>
                                                                        <td>{oder && oder.cartPrice}</td>
                                                                        <td>{oder && oder.commission}</td>
                                                                        <td>{oder && oder.isActiveAdmin ? "Active" : "In Active"}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        ) : (
                                                                <tr>
                                                                    <td>Loading...</td>

                                                                </tr>
                                                            )}
                                                    </tbody>
                                                </Table>
                                            ) : (
                                                <span style={{ lineHeight: '60px' }}>No Data</span>
                                            )}

                                    </Col>
                                </Row>{" "} */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
