topic?.map((topics) => {


  // console.log("topics._id", topics._id);
  return (
    <Row>
      <Col md={8}>
        <div className="d-flex border rounded my-2 p-2">
          <div className="color_blue flex-grow-1 py-2">
            {topics.topicName}
          </div>

          <button
            className="rounded text-white linear_gradient_desk px-4"
            // onClick={() => getQuestion(topics?._id)}
            onClick={() =>
              history.push(`/mcq_test_question?id=${topics?._id}`)
            }
          >
            Start Exam
          </button>

        </div>
      </Col>
    </Row>

  );
})