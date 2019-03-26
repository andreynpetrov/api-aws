//import config from "config";

export const pageService = {
  getPage
};

function getPage(state, slug) {
  console.log("This is getPage service");
  return { slug: slug, title: slug, content: "This is test content." };
}
