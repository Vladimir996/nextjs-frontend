import Image from 'next/image'
import Seo from "../../components/seo";
import Layout from "../../components/layout";
import Articles from "../../components/articles";
// import image from "../../assets/images";

import { fetchAPI } from "../../lib/api";
import Webshops from "../../components/webshops";

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  };

  console.log("KATEGORIJE", category.attributes.webshops.data);
  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.attributes.name}</h1>
          {/* <Articles articles={category.attributes.articles.data} /> */}
          { category.attributes.webshops.data.length !== 0 ?
            (<Webshops webshops={category.attributes.webshops.data} />) 
            :
            (<div className='not-found'>
              <Image src="/itemsNotFound.avif" alt="me" layout='fill' />
            </div>)
          }
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });


  // console.log("KATEGORIJE111", categoriesRes);
  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: "*",
      },
      webshops: {
        populate: "*",
      },
    },
  });
  const allCategories = await fetchAPI("/categories");

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
    },
    revalidate: 1,
  };
}

export default Category;