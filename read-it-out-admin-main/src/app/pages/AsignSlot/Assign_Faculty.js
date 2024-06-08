import React, { useState } from "react";
import { Button, DatePicker, Table, Select } from "antd";
import { ApiGet, ApiPost } from "../../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import ReactTable from "react-table";
import {
  Col,
  Container,
  CardBody,
  Card,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import "antd/dist/antd.css";
import AsignSlotEdit from "./AsignSlotEdit";
import moment from "moment";
import { useHistory } from "react-router";

const spacing = {
  margin: "3%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};

const Assign_Faculty = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [loading, setloading] = useState(false);
  const [modal, setModal] = useState(false);
  const [page, SetPage] = useState(1);
  const [pages, SetPages] = useState(0);
  const [pagesize, SetPageSize] = useState(10);

  const [columns2, setcolumn2] = useState([
    {
      Header: "Course Name",
      filterable: false,
      Cell: (row) => {
        return <div>{row.original.course_subject[0].title}</div>;
      },
    },
    {
      Header: "User name",
      filterable: false,
      minWidth: 250,
      Cell: (row) => {
        return (
          <div>
            <center>{row?.original?.user[0].name}</center>
          </div>
        );
      },
    },
    // {
    //   Header: "Last Login",
    //   filterable: false,
    //   Cell: (row) => {
    //     if (row.original.logLatestDate) {
    //       row.original.logLatestDate = moment(
    //         row.original.logLatestDate
    //       ).format("DD-MM-YYYY");
    //     }
    //     return <div>{row.original.logLatestDate}</div>;
    //   },
    // },

    // {
    //   Header: "Modules Completed",
    //   filterable: false,
    //   Cell: (row) => {
    //     return <div>{row.original.topicCovered}</div>;
    //   },
    // },
  ]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setselectedRowKeys(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const getData = (limit, page) => {
    const body = {
      limit,
      page,
      search: "",
    };
    ApiPost("/training_option/get_filter_training_option_record", body)
      .then((res) => {
        console.log(
          "/training_option/get_filter_training_option_record",
          res.data.data
        );
        setData(res.data.data.student_data);

        SetPage(res.data.data.state.page);
        SetPages(res.data.data.state.page_limit);
        SetPageSize(res.data.data.state.limit);
        setloading(false);
        // let dummy = res.data.data;
        // let data2 = dummy.map((v, i) => {
        //   return { ...v, key: i + 1 };
        // });
        // console.log("data2", data2);
        // setData(data2);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const start = () => {
    setModal(!modal);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const fetchData = (state) => {
    console.log("state", state);
    setloading(true);
    if (state.page == 0) {
      getData(state.pageSize, state.pageshow);
    } else {
      getData(state.pageSize, state.page + 1);
    }
  };

  return (
    <div>
      <Container style={position}>
        <Row></Row>
        <Row>
          <Col md={12}>
            <ToastContainer />
            <Breadcrumb>
              <BreadcrumbItem active>
                Userlist of Live online training option
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>

          <Col md={12}>
            <Card>
              <CardBody>
                <Row className="justify-content-end">
                  <button
                    className="btn btn-light-primary"
                    onClick={() => history.push("batchManagment")}
                  >
                    Batch Create
                  </button>
                </Row>
                <div style={spacing}>
                  <ReactTable
                    data={data}
                    columns={columns2}
                    sortable={true}
                    filterable={true}
                    manual
                    // defaultFilterMethod={filterMethod}
                    showPagination={true}
                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    defaultPageSize={10}
                    resizable={true}
                    loading={loading}
                    pages={pages}
                    pageshow={1}
                    onFetchData={fetchData}
                    className="-striped -highlight"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Assign_Faculty;
