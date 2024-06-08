import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const OptionModal = ({ list, modal, setModal, active, options, loader }) => {
  const [state, setState] = useState("");

  const toggle = (v) => {
    setState(v);
  };
  return (
    <div>
      <Modal.Header>
        <div className="py-2  border-bottom">
          <h3 className="font_size_20 font_medium color_gray px-3 py-2">
            Choose Training Option
          </h3>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          {/* {isLoading === true ? ( */}
          {list.map((item, i) => {
            return (
              <Accordion className="accordionBG">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  onClick={() => toggle(item.name)}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="px-3 py-2 font_size_18 font_medium color_blue font_capital">
                    {state === item.name ? (
                      <MdRadioButtonChecked className="mx-2" fontSize={25} />
                    ) : (
                      <MdRadioButtonUnchecked className="mx-2" fontSize={25} />
                    )}
                    {item.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="d-flex flex-column">
                  <Typography className="font_size_14 font_medium color_light_gray px-3 py-2 font_capital">
                    <ul>
                      {item?.description.map((sub, i) => {
                        return (
                          <li>
                            <div>{sub}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </Typography>

                  <div className="">
                    <div className="d-flex justify-content-center pb-4">
                      <button
                        disabled={loader}
                        className="py-1 text-white font_bold width50 rounded border-none linear_gradient mx-1"
                        onClick={() => active(item?.optionType)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            className="btn text-white linear_gradient text-decoration-none text-center border_none rounded py-1 mx-1"
            // disabled={rattingSubmit}
            onClick={() => setModal(!modal)}
          >
            Cancel
          </button>
        </div>
      </Modal.Footer>
    </div>
  );
};

export default OptionModal;
