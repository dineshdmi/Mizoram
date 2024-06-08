import React, { useRef, useState } from "react";

import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";
import { useHistory } from "react-router";
import { AiFillPrinter } from "react-icons/ai";
import { Button, Col } from "reactstrap";

const ComponentToPrint = (props) => {
    console.log("props", props);
    const history = useHistory();
    const componentRef = useRef();
    const [userData, setUserData] = useState(props.history.location.state);

    return (
        <>
            <Col className="d-flex  justify-content-between rounded box_shadow  m-3 p-2">
                <Button className="rounded linear_gradient_desk px-4 border_none "
                    onClick={() => history.push("/profile/selfAssesment/theoryTest")}
                >
                    Back
                </Button>
                <ReactToPrint
                    trigger={() => (
                        <Button className="rounded linear_gradient_desk px-4 border_none">
                            <AiFillPrinter fontSize={20} />
                        </Button>
                    )}
                    content={() => componentRef.current}
                />
            </Col>
            <Invoice ref={componentRef} userData={userData} />
        </>
    );
};

export default ComponentToPrint;
