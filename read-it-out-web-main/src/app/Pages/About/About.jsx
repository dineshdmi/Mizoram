import React from "react";
import { Col, Row } from "react-bootstrap";
import about from "../../media/aboutUs.jpg";
const About = () => {
  return (
    <>
      <div className="bg-light-grey pt-25 mb-50">
        <div className="container bg-white box_shadow rounded">
          <div className="font_size_26 font_bold color_black border-bottom p-4 ">About Us</div>
          <div className="d-flex pt-50">
            <Col md="6">
              <Row>
                <div className="font_size_16 font_medium color_light_gray">
                  Mizoram State Library was established in the year 1974. The four-storied building
                  located in New Capital Complex, Khatla was constructed with financial assistance
                  received from Raja Rammohun Roy Library Foundation (RRRLF) and has been occupied
                  since 2011. The building accomodate Children section, Reference section, Internet
                  Center, IAS Study Corner, Stack Room, Hindi Section, Mizo Section, Periodical
                  Section, Reprography, Reading room/corner etc. The location also offers a quiet
                  environment suitable for reading and studying.
                </div>
              </Row>
              <Row className="pt-15">
                <div className="font_size_16 font_medium color_light_gray">
                  Mizoram State Library has a vast collection of books in Mizo, English and Hindi
                  which provide an aid for academic study, for research work and for pleasure
                  reading. We have a collection of over 70,000 books. Apart from books we also have
                  digitized collection of rare & copyright free books and we also subscribe various
                  local & national newspaper and magazines. As a member of DELNET, various e-books,
                  e-journals on different subjects can also be accessed in the library. Any
                  interested person can apply for library membership and borrow books for a limited
                  period. Our library collections can be browse from the link WebOPAC provided in
                  our website{" "}
                  <a href="http://www.statelibrary.mizoram.gov.in">
                    http://www.statelibrary.mizoram.gov.in
                  </a>
                </div>
              </Row>
              <Row className="pt-15">
                <div className="font_size_16 font_medium color_light_gray">
                  Library is closed during holidays and has different winter & summer timings.
                  Summer timing- 9:00AM-5:00PM, Winter timing – 9:00AM-4:00PM
                </div>
              </Row>
            </Col>
            <Col md="6">
              <div>
                <div className="profile-img3 pb-30">
                  <img src={about} alt="" className="img-fluid rounded-3" />
                </div>
              </div>
            </Col>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
