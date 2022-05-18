import React from "react";
import CardWebshop from "./cardWebshop";

const Webshops = ({ webshops }) => {
  const leftWebshopsCount = Math.ceil(webshops.length / 5);
  const leftWebshops = webshops.slice(0, leftWebshopsCount);
  const rightWebshops = webshops.slice(leftWebshopsCount, webshops.length);


  return (
    <div>
      <div className="uk-child-width-1-2@s" data-uk-grid="true">
        <div>
          {leftWebshops.map((webshop, i) => {
            return (
              <CardWebshop
              webshop={webshop}
                key={`article__left__${webshop.attributes.slug}`}
              />
            );
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match uk-grid" data-uk-grid>
            {rightWebshops.map((webshop, i) => {
              return (
                <CardWebshop
                webshop={webshop}
                  key={`article__left__${webshop.attributes.slug}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Webshops;