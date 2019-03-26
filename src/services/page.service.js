//import config from "config";

export const pageService = {
  getPage
};

function getPage(state, slug) {
  console.log("This is getPage service");
  return { slug: slug, title: slug, content: "## This is test content. ##\n It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." };
}
