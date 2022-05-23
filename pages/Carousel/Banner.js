import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";

const Banner = ({ webshops }) => {
  return (
    <Carousel autoPlay infiniteLoop showArrows={false} interval="2000">
      {webshops.map((webshop, i) => (
        <div key={i}>
          {/* <Link href={`/webshop/${webshop.attributes.slug}`}> */}
            {/* <a className="uk-link-reset"> */}
              <img
                src={`http://localhost:1337${webshop.attributes.ImgPhone.data.attributes.url}`}
                alt="image1"
              />
            {/* </a>
          </Link> */}
          {/* <p className="legend">Image {i+1}</p> */}
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
