import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Banner = ({ articles }) => {
  // console.log(
  //   articles[0].attributes.image.data.attributes.url,
  //   "Testiranjee1111"
  // );
  // const imageUrl = getStrapiMedia(articles[0].attributes.image);
  // console.log(imageUrl, "Testiranjee22222222");

  return (
    <div>
      <Carousel autoPlay infiniteLoop showArrows={false} interval="4000">
        {articles.map((article, i) => (
          <div key={i}>
            <img
              src={`http://localhost:1337${article.attributes.image.data.attributes.url}`}
              alt="image1"
            />
            <p className="legend">Image {i+1}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
