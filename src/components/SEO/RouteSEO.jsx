import React from "react";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import { getSeoPageByPath } from "../../seo/siteSeoData";

const RouteSEO = () => {
  const { pathname } = useLocation();
  const page = getSeoPageByPath(pathname);

  return <SEO page={page} />;
};

export default RouteSEO;
