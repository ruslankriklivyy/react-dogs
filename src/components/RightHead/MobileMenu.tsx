import React from 'react';
import { Categories } from '..';
import { useRootStore } from '../../store/RootState.Context';

const MobileMenu = () => {
  const { filterStore } = useRootStore();
  const [activeMenu, setActiveMenu] = React.useState(false);

  const openMenu = () => {
    setActiveMenu(true);
  };

  const closeMenu = () => {
    setActiveMenu(false);
  };

  return (
    <div className="mobile-menu">
      <button className="mobile-menu-btn" onClick={openMenu}>
        <svg
          width="30"
          height="18"
          viewBox="0 0 30 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30 2H0V0H30V2ZM30 10H0V8H30V10ZM30 18H0V16H30V18Z"
            fill="#FF868E"
          />
        </svg>
      </button>
      {activeMenu && (
        <div className="mobile-menu-box">
          <button className="mobile-menu-btn mobile-menu-btn--close" onClick={closeMenu}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.05691 8.99997L0.52832 1.47137L1.47113 0.528564L8.99972 8.05716L16.5283 0.528564L17.4711 1.47137L9.94253 8.99997L17.4711 16.5286L16.5283 17.4714L8.99972 9.94278L1.47113 17.4714L0.52832 16.5286L8.05691 8.99997Z"
                fill="#FF868E"
              />
            </svg>
          </button>
          <nav className="navigation">
            <ul className="menu">
              {filterStore.menuCategories.map((item, index: number) => (
                <Categories key={index} closeMenu={closeMenu} {...item} />
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
