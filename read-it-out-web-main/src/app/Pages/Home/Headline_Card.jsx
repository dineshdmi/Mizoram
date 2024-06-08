import React from "react";
import { Card } from "react-bootstrap";
// import imgs4 from "../../media/img/books.png";
import imgs4 from "../../media/img/Hbook1.png";

const Headline_Card = () => {
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={imgs4}
          height="200px"
          className="rounded"
        />
        <Card.Body className="bg-white">
          <h6>The Word In Classical Literatur...</h6>
          <Card.Text>
            making it look like readable English. Many desktop publishing ...
            <span className="color_blue  text-start font_bold">Read More</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Headline_Card;
