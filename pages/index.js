import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Webshops from "../components/webshops";
import { fetchAPI } from "../lib/api";
import Banner from "./Carousel/Banner";

const Home = ({ articles, webshops, categories, homepage }) => {
  // console.log("categories TEST", categories);
  return (
    <div>
      <Layout categories={categories}>
      <Banner articles={articles} />
        <Seo seo={homepage.attributes.seo} />
        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <h1>{homepage.attributes.hero.title}</h1>
            <Articles articles={articles} />
          </div>
        </div>
        <Webshops webshops={webshops} />
      </Layout>
    </div>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, webshopsRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI("/articles", { populate: "*" }),
    fetchAPI("/webshops", { populate: "*" }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        hero: { populate: { anotherCompo: { populate: "*" } }},
        seo: { populate: "*" },
      },
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