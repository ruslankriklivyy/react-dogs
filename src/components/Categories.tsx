import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

interface ICategories {
  img: string;
  link: string;
  color: string;
  id: number;
  title: string;
  closeMenu?: () => void;
}

export const Categories: React.FC<ICategories> = React.memo(function Categories({
  img,
  link,
  color,
  id,
  title,
  closeMenu,
}) {
  let location = useLocation();

  return (
    <li key={id} className="menu__item" onClick={closeMenu}>
      <Link
        to={`/${link}`}
        className={classNames({
          'menu__item-link active':
            location.pathname.includes(link) || location.pathname === '/dog',
          'menu__item-link': location.pathname !== '/dog' || !location.pathname.includes(link),
        })}>
        <div className="menu__item-top" style={{ backgroundColor: `${color}` }}>
          <img src={img} alt="item png" />
        </div>
        <div className="menu__item-bottom">
          <span>{title}</span>
        </div>
      </Link>
    </li>
  );
});
