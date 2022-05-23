import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Webshops from "../components/webshops";
import { fetchAPI } from "../lib/api";
import Banner from "./Carousel/Banner";
import NextImage from "../components/image";

const Home = ({ articles, webshops, categories, homepage }) => {
  // console.log("webshops TEST", webshops);
  // console.log("homepage TEST", homepage.attributes.footer.data.attributes.caption);
  return (
    <div>
      <Layout categories={categories}>
      <Banner webshops={webshops} />
        <Seo seo={homepage.attributes.seo} />
        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <h1>{homepage.attributes.hero.title}</h1>
            {/* <Articles articles={articles} /> */}
          </div>
        </div>
        <Webshops webshops={webshops} />
      </Layout>
      {/* <img src={homepage.attributes.footer.data.attributes.caption} /> */}
      <NextImage image={homepage.attributes.footer} />
    </div>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, webshopsRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI("/articles", { populate: "*" }),
    fetchAPI("/webshops", { populate: "*" }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/homepage", { populate: "*"
      // populate: {
      //   hero: { populate: { anotherCompo: { populate: "*" } }},
      //   seo: { populate: "*" },
      // },
    }),
  ]);

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
      webshops: webshopsRes.data
    },
    revalidate: 1,
  };
}

export default Home;