import pressArticlesData from "./pressArticlesData.json";

export const pressArticles = pressArticlesData;

export const findPressArticle = (id) =>
  pressArticles.find((article) => article.id === id || article.slug === id);
