import React from "react";
import Link from "next/link";
import NextImage from "./image";

const CardWebshop = ({ webshop }) => {
  return (
    <Link href={`/webshop/${webshop.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <NextImage image={webshop.attributes.ImgPhone} />
          </div>
          <div className="uk-card-body">
            <p id="category" className="uk-text-uppercase">
              {webshop.attributes.category.data.attributes.name}
            </p>
            <p id="title" className="uk-text-large">
              {webshop.attributes.NameMobile}
            </p>
            {/* <p id="title" className="uk-text-large">
              {webshop.attributes.Model}
            </p> */}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CardWebshop;