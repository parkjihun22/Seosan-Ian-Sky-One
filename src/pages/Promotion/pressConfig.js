import { siteSeo } from "../../seo/siteSeoData";

export const pressCollectionName =
  process.env.REACT_APP_FIREBASE_PRESS_COLLECTION || "press";

export const defaultPressSiteId =
  process.env.REACT_APP_SITE_ID || siteSeo.siteName;

export const defaultPressSource =
  process.env.REACT_APP_PRESS_SOURCE || `${siteSeo.siteName} 공식`;

export const getPressSiteId = (routeSite) => routeSite || defaultPressSiteId;
