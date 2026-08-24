import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MenuBar.module.scss";

const MenuBar = ({ contents = [] }) => {
  const { pathname } = useLocation();

  const isActive = (url) => pathname === url || pathname.startsWith(`${url}/`);

  return (
    <nav className={styles.container} aria-label="페이지 하위 메뉴">
      <div className={styles.inner}>
        {contents.map((item) => {
          const active = isActive(item.url);

          return (
            <Link
              key={item.url}
              className={active ? styles.selectedItem : styles.item}
              to={item.url}
              aria-current={active ? "page" : undefined}
            >
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MenuBar;
