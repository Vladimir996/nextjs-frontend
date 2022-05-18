import Seo from "../../components/seo";
import Layout from "../../components/layout";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

import { getStrapiMedia } from "../../lib/media";
import { fetchAPI } from "../../lib/api";

const Webshop = ({ webshop, categories }) => {
    // console.log("SLUG STRANICA", getStrapiMedia(webshop.attributes.ImgPhone));
  const imageUrl = getStrapiMedia(webshop.attributes.ImgPhone);

  // console.log("WEBSHOP STRANICA111", webshop);
  const seo = {
    metaTitle: webshop.attributes.NameMobile,
    metaDescription: webshop.attributes.MobileDescription,
    shareImage: webshop.attributes.ImgPhone,
    webshop: true,
  };

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
        <div>
          <div
            id="banner"
            className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
            data-src={imageUrl}
            data-srcset={imageUrl}
            data-uk-img
          >
            <h1>{webshop.attributes.NameMobile}</h1>
          </div>
          <div className="uk-section">
            <div className="uk-container uk-container-small">
              <ReactMarkdown children={webshop.attributes.Sprecification} />
              <hr className="uk-divider-small" />
              <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                <div>
                  {webshop.attributes.author.data.attributes.picture && (
                    <img
                      src={getStrapiMedia(
                        webshop.attributes.author.data.attributes.picture
                      )}
                      alt={
                        webshop.attributes.author.data.attributes.picture.data
                          .attributes.alternativeText
                      }
                      style={{
                        position: "static",
                        borderRadius: "20%",
                        height: 60,
                      }}
                    />
                  )}
                </div>
                <div className="uk-width-expand">
                  <p className="uk-margin-remove-bottom">
                    By {webshop.attributes.author.data.attributes.name}
                  </p>
                  <p className="uk-text-meta uk-margin-remove-top">
                    <Moment format="MMM Do YYYY">
                      {webshop.attributes.published_at}
                    </Moment>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};


export async function getStaticPaths() {
    const webshopsRes = await fetchAPI("/webshops", { fields: ["slug"] });
  
    return {
      paths: webshopsRes.data.map((webshop) => ({
        params: {
          slug: webshop.attributes.slug,
        },
      })),
      fallback: false,
    };
  }
  
  export async function getStaticProps({ params }) {
    const webshopsRes = await fetchAPI("/webshops", {
      filters: {
        slug: params.slug,
      },
      populate: ["ImgPhone", "category", "author.picture"],
    });
    const categoriesRes = await fetchAPI("/categories");
  
    return {
      props: { webshop: webshopsRes.data[0], categories: categoriesRes },
      revalidate: 1,
    };
  }

export default Webshop;
