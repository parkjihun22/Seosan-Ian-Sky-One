import { pressArticles } from "./pages/Promotion/pressArticles";

const NewsList = pressArticles.map((article) => ({
  id: article.id,
  title: article.title,
  excerpt: article.summary,
  date: article.date,
  link: `/Promotion/Press/${article.slug || article.id}`,
  image: article.image,
}));

export default NewsList;
