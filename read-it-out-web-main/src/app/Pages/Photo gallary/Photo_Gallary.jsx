import React, { useEffect, useState } from "react";
import imgs1 from "../../media/img/book1.png";
import imgs2 from "../../media/img/book2.png";
import imgs3 from "../../media/img/book3.png";
import imgs4 from "../../media/img/book4.png";
import StackGrid, { transitions } from "react-stack-grid";
import {
  ApiGet,
  ApiGetNoAuth,
  ApiPost,
  ApiPostNoAuth,
  Bucket,
} from "app/helpers/API/ApiData";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const { scaleDown } = transitions;

const Photo_Gallary = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const getGallery = async () => {
    let body = {
      limit: 10,
      page: 1,
    };
    await ApiPostNoAuth("student/gallery/get_gallery", body)
      .then((res) => {
        console.log(res);
        setData(res.data.data?.gallery_data);
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          history.push("/postlist");
        }
        toast.error(err);
      });
  };

  useEffect(() => {
    getGallery();
    setTimeout(() => {
      document.getElementById("photoGalleryNav").click()
    }, 500)
  }, []);
  return (
    <div className="">
      <div className="container py-5">
        {data?.length > 0 && <StackGrid
          columnWidth={300}
          gutterWidth={10}
          gutterHeight={10}
          duration={1000}
          appear={scaleDown.appear}
          appeared={scaleDown.appeared}
          enter={scaleDown.enter}
          entered={scaleDown.entered}
          leaved={scaleDown.leaved}
        >
          {data?.map((val) => (
            <div className="" key={val?._id}>
              <img
                src={Bucket + val?.image}
                alt=""
                className="img-fluid w-100"
              />
            </div>
          ))}
        </StackGrid>}
      </div>
    </div>
  );
};

export default Photo_Gallary;
