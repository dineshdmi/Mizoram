{
  que.option.map((opt) =>
    que.user_answer === que.answer ? (
      // console.log(
      //   "que.user_answer === que.answer",
      //   que.user_answer === que.answer
      // )

      <>
        {/* {que.user_answer !== que.answer ? (
        // console.log(
        //   "que.user_answer !== que.answer",
        //   que.user_answer !== que.answer
        // )
        <div className="px-3 py-2 d-flex align-items-center rounded box_shadow bg_light_red box_shadow3 my-2 pointer w-100 ">
          {opt}
        </div>
      ) : (
        <div className="px-3 py-2 d-flex align-items-center rounded box_shadow bg_light_blue box_shadow2 my-2 pointer w-100 ">
          {opt}
        </div>
      )} */}
        <div className="px-3 py-2 d-flex align-items-center rounded box_shadow bg_light_blue box_shadow2 my-2 pointer w-100 ">
          {opt}
        </div>
      </>
    ) : (
      <div className="px-3 py-2 d-flex align-items-center rounded box_shadow my-2 pointer w-100 ">
        {opt}
      </div>
    )
  );
}

{
  item.user_answer === item1 ? (
    item.answer === item1 ? (
      <Image
        source={Icons.correct}
        style={{ alignSelf: "center", marginRight: wp(5) }}
      ></Image>
    ) : (
      <Image
        source={Icons.incorrect}
        style={{ alignSelf: "center", marginRight: wp(5) }}
      ></Image>
    )
  ) : item.answer === item1 ? (
    <Image
      source={Icons.correct}
      style={{ alignSelf: "center", marginRight: wp(5) }}
    ></Image>
  ) : (
    <></>
  );
}
