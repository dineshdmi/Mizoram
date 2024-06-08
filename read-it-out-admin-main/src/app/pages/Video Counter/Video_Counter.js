import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import { ApiDelete, ApiGet, ApiPost } from "../../../helpers/API/ApiData";
import BreadcrumbItem from "reactstrap/es/BreadcrumbItem";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import { Col, Container, Row, Table } from "reactstrap";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ReactExport from "react-export-excel";
import { Alert, Space, Spin, Tag } from "antd";

import { HiDownload } from "react-icons/hi";

import moment from "moment";
const spacing = {
  margin: "3%",
};

const position = {
  marginTop: "0px",
  maxWidth: "1317px",
};

export default function Video_Counter(props) {
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState([]);

  const [accountData, setaccountData] = useState({});
  const [open1, setOpen1] = useState(false);
  const [slot, setSlot] = useState({});
  const [statusp, Setstatusp] = useState("");
  const [page, SetPage] = useState(1);
  const [pages, SetPages] = useState(0);
  const [pagesize, SetPageSize] = useState(10);
  const [counts, setCount] = useState();
  const [loading, setloading] = useState(false);
  const [recordCount, setRecordCount] = useState();
  const history = useHistory();

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const columns = [
    { title: "Course", field: "course" },
    { title: "Date", field: "date" },
    { title: "Start Time", field: "start_time" },
    { title: "End Time", field: "end_time" },
    { title: "Total Student", field: "totalStudent" },
    { title: "Student Information", field: "userData" },
  ];
  const [columns2, setcolumn2] = useState([
    {
      Header: "User name",
      filterable: false,
      minWidth: 250,
      Cell: (row) => {
        return <div>{row?.original?.user[0]?.name}</div>;
      },
    },
    {
      Header: "Program Name",
      filterable: false,
      Cell: (row) => {
        return <div>{row.original.course_subject[0]?.title}</div>;
      },
    },
    {
      Header: "Last Login",
      filterable: false,
      Cell: (row) => {
        return (
          <div>{moment(row.original?.logLatestDate).format("DD-MM-YYYY")}</div>
        );
      },
    },

    {
      Header: "Courses Completed",
      filterable: false,
      Cell: (row) => {
        return <center>{row.original?.topicCovered}</center>;
      },
    },
  ]);

  const EditQuestion = (row) => {
    history.push("/slotEdit?id=" + row);
  };
  const handleClickOpen1 = (row) => {
    setModal(!modal);
    setSlot(row);
    console.log("row", row);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleonChange1 = (e) => {
    let { name, value } = e.target;

    setaccountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };
  const BlockPage = (row) => {
    console.log("/assign_faculty/delete/" + row);
    ApiDelete("/assign_faculty/delete/" + row)
      .then((res) => {
        if (res.status === 200) {
          handleClose1();
          toast.success(res.message);
          toast.success("Assigned Faculty Successfully Deleted");
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(res.message);
          console.log("This .then Block");
        }
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/timeSlotList");
          console.log("This .then Block 410 Block");
        } else {
          toast.error(err.message);
          console.log("This .then Block 410 Else Block");
        }
      });
  };

  console.log(category);
  const contectus = (limit, page) => {
    const body = {
      limit,
      page,
      serach: "",
    };
    ApiPost("/video_training_log/get_video_training_log", body)
      .then((res) => {
        setRecordCount(res.data.data);
        setCategory(res.data.data.student_data);

        SetPage(res.data.data.state.page);
        SetPages(res.data.data.state.page_limit);
        SetPageSize(res.data.data.state.limit);
        setloading(false);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  };

  const fetchData = (state) => {
    console.log("state", state);
    setloading(true);
    if (state.page == 0) {
      contectus(state.pageSize, state.pageshow, statusp);
    } else {
      contectus(state.pageSize, state.page + 1, statusp);
    }
  };
  //   useEffect(() => {
  //     contectus(10,1);
  //   }, []);

  return (
    <>
      <Container style={position}>
        <Row></Row>
        <Row>
          <Col md={12}>
            <ToastContainer />
            <Breadcrumb>
              <BreadcrumbItem active>
                List of all User training log
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>

          <Col md={12}>
            <Card>
              <CardBody>
                <Row>
                  {/* <Col md={4}>
                    <Breadcrumb className="m-0">
                      Completed training : &nbsp;{" "}
                      {loading === true ? (
                        <Space size="middle">
                          <Spin size="small" />
                        </Space>
                      ) : (
                        <Tag color="#2db7f5">
                          {recordCount?.completed_video}
                        </Tag>
                      )}
                    </Breadcrumb>
                  </Col> */}
                  <Col md={4}>
                    <Breadcrumb className="m-0">
                      Total record : &nbsp;{" "}
                      {loading === true ? (
                        <Space size="middle">
                          <Spin size="small" />
                        </Space>
                      ) : (
                        <Tag color="#2db7f5">{recordCount?.student_count}</Tag>
                      )}
                    </Breadcrumb>
                  </Col>
                </Row>

                <div style={spacing}>
                  <ReactTable
                    data={category}
                    columns={columns2}
                    sortable={true}
                    filterable={true}
                    manual
                    defaultFilterMethod={filterMethod}
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
    </>
  );
}
