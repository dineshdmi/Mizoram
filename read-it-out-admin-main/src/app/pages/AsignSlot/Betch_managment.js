import React, { useEffect, useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import {
  Checkbox,
  DatePicker,
  Select,
  Space,
  Spin,
  Table,
  Button,
  Icon,
  Pagination,
} from "antd";
import moment from "moment";
import { useHistory } from "react-router";
import { ApiGet, ApiPost } from "../../../helpers/API/ApiData";
import { Dropdown } from "react-bootstrap";

const getColumnSearchProps = (name) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          this.searchInput = node;
        }}
        placeholder={`Search ${name}`}
        value={selectedKeys[0]}
        // onChange={e =>setSelectedKeys(e.target.value ? [e.target.value] : [])}
        // onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Button
        type="primary"
        // onClick={() => this.handleSearch(selectedKeys, confirm)}
        icon="search"
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button
        // onClick={() => this.handleReset(clearFilters)}
        size="small"
        style={{ width: 90 }}
      >
        Reset
      </Button>
    </div>
  ),

})
const columns = [
  {
    title: "Name",
    dataIndex: "userDetail",
    render: (text) => <a>{text[0]?.name}</a>,
    // filterDropdown: getColumnSearchProps("userDetail"),
    // filters: [
    //   { text: 'AHAFO', value: 'AHAFO' },
    //   { text: 'BONO', value: 'BONO' },
    //   { text: 'Bono East', value: 'Bono East' },
    //   { text: 'Eastern', value: 'Eastern' },
    //   { text: 'Greater Accra', value: 'Greater Accra' },
    //   { text: 'North East', value: 'North East' },
    //   { text: 'North East', value: 'North East' },
    //   { text: 'Northern', value: 'Northern' },
    //   { text: 'OTI', value: 'OTI' },
    //   { text: 'Savanah', value: 'Savanah' },
    //   { text: 'Upper East', value: 'Upper East' },
    //   { text: 'Upper West', value: 'Upper West' },
    //   { text: 'Volta', value: 'Volta' },
    //   { text: 'Western', value: 'Western' },
    //   { text: 'Western North', value: 'Western North' },
    // ],
  },
  {
    title: "Email",
    dataIndex: "userDetail",
    render: (text) => <a>{text[0]?.email}</a>,

  },
];

const { Option } = Select;
let page = 1;
const Betch_managment = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [time, setTime] = useState([]);
  const [dates, setDates] = useState();
  const [subject, setSubject] = useState("");
  const [rigion, setRigion] = useState("");
  const [addUsers, setAddUsers] = useState([]);
  const [rigionState, setRigionState] = useState([]);
  const [addTime, setAddTime] = useState();
  const [items, setItems] = useState([]);
  const [datas, setDatas] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [state3, setState3] = useState(false);
  const [pages, setpage] = useState(1);
  const [errors, setError] = useState({});

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const selectValue2 = (value, option) => {
    setAddUsers(value);
    // console.log("selectValue2", value, option);
    // getData(value);
  };
  const selectValue3 = (value, option) => {
    setAddTime(value);
    // console.log("selectValue2", value, option);
    // getData(value);
  };
  const onchange = (value, option) => {
    // console.log("selectValue2", value, option);
    setDates(option);
    // getData(value);
  };

  const formValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!dates) {
      console.log("a");
      formIsValid = false;
      errors["dates"] = toast.error("Please select date");
    }
    if (!addTime) {
      console.log("a");
      formIsValid = false;
      errors["addTime"] = toast.error("Please select time");
    }
    if (!subject) {
      console.log("a");
      formIsValid = false;
      errors["subject"] = toast.error("Please select course");
    }
    if (!user.length) {
      console.log("a");
      formIsValid = false;
      errors["user.length"] = toast.error("Please select users");
    }

    setError(errors);
    // console.log("valid1");
    // console.log(formIsValid);
    return formIsValid;
  };

  const submit = () => {
    if (subject && dates && addTime && user.length) {
      const body = {
        date: moment(dates).format(),
        time_slotId: addTime,
        subjectId: subject,
        selectedUser: user,
      };
      console.log("submit", body);
      ApiPost("/user_batch/add", body)
        .then((res) => {
          toast.success(res.message);
          setTimeout(() => {
            history.push("/slotList");
          }, 2000);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      !subject && toast.error("Please select course");
      !dates && toast.error("Please select date");
      !addTime && toast.error("Please select time");
      subject && user.length === 0 && toast.error("Please select users");
    }
  };

  useEffect(() => {
    ApiPost("/training_option/get_subject_user_list")
      .then((res) => {
        // console.log("/training_option/get_subject_user_list", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    ApiGet("/time_slot")
      .then((res) => {
        setTime(res.data.data);
        // console.log("Sucess");
        // console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);

  useEffect(() => {
    ApiGet("/get_region")
      .then((res) => {
        console.log(res.data.data);
        setRigionState(res.data.data);
        // console.log("Sucess");
        // console.log(res.data.data);
      })
      .catch((err) => {
        if (err.status == 410) {
          history.push("/slotList");
        } else {
          toast.error(err.message);
        }
      });
  }, []);
  // const rigionState = [
  //   {
  //     state: 'AHAFO'
  //   },
  //   {
  //     state: 'BONO'
  //   },
  //   {
  //     state: 'Bono East'
  //   },
  //   {
  //     state: 'Eastern'
  //   },
  //   {
  //     state: 'Greater Accra'
  //   },
  //   {
  //     state: 'North East'
  //   },
  //   {
  //     state: 'Northern'
  //   },
  //   {
  //     state: 'OTI'
  //   },
  //   {
  //     state: 'Savanah'
  //   },
  //   {
  //     state: 'Upper East'
  //   },
  //   {
  //     state: 'Upper West'
  //   },
  //   {
  //     state: 'Volta'
  //   },
  //   {
  //     state: 'Western'
  //   },
  //   {
  //     state: 'Western North'
  //   },

  // ]

  const lodeMore = (e) => {
    const { target } = e;
    if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
      // API call (to load more data..........)
      // console.log("eeeee");
      page = page + 1;
      // getData(subject);
      fetchData(subject);
    }
  };

  const getComments = async (subjectId) => {
    let body = {
      subjectId,
      limit: 20,
      page: pages,
      // search: search.value,
    };

    // console.log("BODY", body);
    await ApiPost("/training_option/get_subject_user_list", body)
      .then((res) => {
        console.log("/training_option/get_subject_user_list", res.data.data);

        let dummy = res.data.data.student_data;
        let data2 = dummy.map((v, i) => {
          return { ...v, key: i + 1 };
        });
        console.log("data2", data2);
        setItems(data2);
        setLoader(true);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  console.log(pages);

  const fetchData = async (subjectId, page) => {
    // setLoader(false);
    let body = {
      subjectId,
      limit: 20,
      page,
      // search: search.value,
    };

    console.log("BODY", body);
    await ApiPost("/training_option/get_subject_user_list", body)
      .then((res) => {
        console.log("/training_option/get_subject_user_list", res.data.data);
        let dummy = res.data.data.student_data;
        let data2 = dummy.map((v, i) => {
          return { ...v, key: i + 1 };
        });
        console.log("data2", data2);
        setItems(data2);
        // setItems((post) => [...post, ...res.data.data.student_data]);
        // setpage(res.data.data.state.page);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const selectValue = (value, option) => {
    setSubject(value);
    // console.log("hhhhhhhh", value, option);
    // getData(value);
    // getComments(value);
    getAPI(value);
    setToggle(true);
  };
  const selectRigion = (value, option) => {
    setRigion(value);

  };
  const clearRigion = () => {
    setRigion('');
    getAPI(subject);

  };

  const selectItems = (e, id) => {
    // setChecked(e.target.checked);
    // console.log(id);
    if (e.target.checked) {
      setDatas((post) => [...post, id]);
    } else {
      setDatas((post) => post.filter((x) => x !== id));
    }
  };
  console.log(datas);

  const rowSelection = {
    onSelectAll: (selected, selectedRows, changeRows) => {
      const selectedId = selectedRows.map((item) => item.userDetail[0]?._id);
      setUser((post) => [...selectedId]);
    },
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      console.log("selectedRows", selectedRows);
      const selectedId = selectedRows.map((item) => item.userDetail[0]?._id);
      setUser((post) => [...selectedId]);
    },

    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  console.log(user);
  const getAPI = (i) => {
    ApiGet(`/training_option_record/${i}`)
      .then((res) => {
        console.log("/training_option/get_subject_user_list", res.data.data);

        let dummy = res.data.data;
        let data2 = dummy.map((v, i) => {
          return { ...v, key: i + 1 };
        });
        // console.log("data2", data2);
        setItems(data2);
        setLoader(true);
        // setItems((post) => [...post, ...res.data.data.student_data]);
        // setpage(res.data.data.state.page);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  };

  return (
    <div>
      <Container>
        <ToastContainer position="top-right" />
        <Row>
          <Col md={12}>
            <Card>
              <CardBody>
                <Form>
                  <Row>
                    <Col md={12}>
                      <FormGroup className="d-flex flex-column">
                        <Label>
                          Select course
                          <span style={{ color: "red" }}> * </span>
                        </Label>
                        <Select
                          showSearch
                          required
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          onChange={selectValue}
                        >
                          {data.map((item, i) => {
                            return (
                              <Option value={item._id}>{item.title}</Option>
                            );
                          })}
                        </Select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="d-flex flex-column">
                        <Label>
                          Date slot<span style={{ color: "red" }}> * </span>
                        </Label>
                        <DatePicker
                          disabledDate={disabledDate}
                          onChange={onchange}
                        // disabledTime={disabledDateTime}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="d-flex flex-column">
                        <Label>
                          Time slot<span style={{ color: "red" }}> * </span>
                        </Label>
                        <Select
                          maxTagCount="responsive"
                          required
                          allowClear
                          showSearch
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          onChange={selectValue3}
                        >
                          {time.map((val, i) => {
                            return (
                              <Option
                                value={val._id}
                              >{`${val.start_time} to ${val.end_time}`}</Option>
                            );
                          })}
                        </Select>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <button
                      className="btn btn-light-primary mx-2"
                      onClick={submit}
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => history.push("slotList")}
                      className="btn btn-light mx-2"
                    >
                      Cancel
                    </button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {toggle === true && (
        <Container className="mt-1">
          <Row>

            <Col md={12}>
              <Card>
                <CardBody>
                  <Row className="float-right">
                    <FormGroup className="d-flex flex-column">
                      <Label>
                        Select course
                        <span style={{ color: "red" }}> * </span>
                      </Label>
                      <Select
                        allowClear
                        showSearch
                        required
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        onChange={selectRigion}
                        onClear={() => setRigion("")}
                      >
                        {
                          rigionState.map(state => (
                            <Option value={state.state}>{state.state}</Option>
                          ))
                        }



                      </Select>
                    </FormGroup>

                  </Row>
                  {console.log("rigion", rigion)}
                  <Table
                    rowSelection={{
                      type: "checkbox",
                      ...rowSelection,
                    }}
                    loading={
                      loader === false && (
                        <Space size="middle">
                          <Spin size="large" />
                        </Space>
                      )
                    }
                    scroll={{ y: 400 }}
                    columns={columns}
                    dataSource={items.filter(val => {
                      // ;
                      if (rigion == '' || rigion == undefined) {

                        return val
                      } else if (val.userDetail[0]?.region?.toLowerCase().includes(rigion?.toLowerCase())) {
                        if (val.userDetail[0]?.email?.split('@')[val.userDetail[0]?.email?.split('@').length - 1] == 'ges.gov.gh') {
                          return val
                        }

                      }
                    })}
                  // pagination={false}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Betch_managment;
