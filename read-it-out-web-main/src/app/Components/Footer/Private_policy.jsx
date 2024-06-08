import React from "react";
import { Col, Row } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
const Private_policy = () => {
  return (
    <>
      <div className="bg-light-grey pt-25 mb-50">
        <div className="container bg-white box_shadow rounded">
          <div className="font_size_26 font_bold color_black border-bottom p-4 ">
            Privacy Policy
          </div>
          <div className=" pt-50 pb-30">
            <Row className="pt-25">
              <Col md="12">
                <div className="d-flex align-items-center">
                  <div className="">
                    <GoPrimitiveDot color="#00bde2" />
                  </div>
                  <div className="mx-2">You own your privacy; we are committed to protecting it.</div>
                </div>
              </Col>
            </Row>
            <Row className="pt-25">
              <Col md="12">
                <div className="d-flex align-items-center">
                  <div className="">
                    <GoPrimitiveDot color="#00bde2" />
                  </div>
                  <div className="mx-2">OUR APPROACH TO PRIVACY</div>
                </div>
                <Row className="text3 pt-15 px-4">
                  KAT recognizes that privacy is a fundamental human right. We further recognize the importance of privacy, security and data protection to our customers and partners worldwide. As a result, we strongly encourage you to take some time to read our Privacy Statement in full.
                </Row>
              </Col>
            </Row>
            <Row className="pt-25">
              <Col md="12">
                <div className="d-flex align-items-center">
                  <div className="">
                    <GoPrimitiveDot color="#00bde2" />
                  </div>
                  <div className="mx-2">KAT Privacy Statement</div>
                </div>
                <Row className="text3 pt-15 px-4">
                  KAT recognizes that privacy is a fundamental human right. We further recognize the importance of privacy, security and data protection to our customers and partners. As a global company, with management structures, legal entities, business operational processes, and technical systems, we strive to provide protections across all of our operations that exceed minimum legal requirements. We also consistently develop and deploy rigorous policies and procedures to safe guard our customers and partners at all times.
                </Row>
                <Row className="text3 pt-15 px-4">
                  We take data security very seriously. Our products are designed to keep your data private and secure, while always pushing forward to offer you the newest, most ground breaking innovation.
                </Row>
                <Row className="text3 pt-15 px-4">
                  This Privacy Statement informs you of our privacy practices and of the choices you can make and rights you can exercise in relation to your personal data, including information that may be collected from your online activity, use of KAT devices, and interactions you have with KAT offline through engagement with our customer support representatives. This Privacy Statement applies to all KAT-owned websites, domains, services (including device management), applications, subscriptions and products as well as KAT owned or sponsored outlets.
                </Row>
                <Row className="text3 pt-15 px-4">
                  This Privacy Statement does not apply to any personal data we process on behalf of our business customers when we provide services. The legal contracts we have with our business customers controls how we process your personal data within that context. If you are a customer, employee or contractor of a KAT business customer(s) and have questions about your personal data we recommend that you contact the specific KAT business customer in the first instance and, if need be, KAT will provide assistance to the business customer in responding to your questions.
                </Row>
                <Row className="text3 pt-15 px-4">
                  Children’s Privacy Unless otherwise stated for a specific product or service, KAT Services are made for the general public. KAT does not deliberately collect data from children as defined by local law without the previous consent of their parents or legal guardians or as otherwise permitted by applicable law.
                </Row>
                <Row className="text3 pt-15 px-4">
                  Your Privacy Requests and Feedback Let us know what you think. At KAT we are committed to protecting your privacy and your feedback is very important to us. If you wish to give us privacy feedback or to make a privacy request, you may do so by submitting your request in writing.
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default Private_policy;
