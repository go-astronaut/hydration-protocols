import { useMenu } from "./Menu.hook";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import RoutesValues from "../../Routes/Routes.enums";
import classes from "./Menu.module.css";

// width of the menu
const WIDTH = 320;

/**
 * Menu Component
 */
const Menu = () => {
  const menu = useMenu();

  // menu item which navigates to time traverse page
  const timeTraverseEl =
    menu.pathname !== RoutesValues.monthTraverse ? (
      <>
        <button
          className={classes["menu-button"]}
          onClick={menu.navigateToTimeTraverse}
        >
          <svg
            className={`${classes["icon"]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M32 32l448 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96L0 64C0 46.3 14.3 32 32 32zm0 128l448 0 0 256c0 35.3-28.7 64-64 64L96 480c-35.3 0-64-28.7-64-64l0-256zm128 80c0 8.8 7.2 16 16 16l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-160 0c-8.8 0-16 7.2-16 16z" />
          </svg>
          <span>{menu.translations.archive}</span>
        </button>
        <Divider />
      </>
    ) : (
      ""
    );

  // menu item which navigates to current month page
  const currentMonthEl =
    menu.pathname !== RoutesValues.currentMonth ? (
      <>
        <button
          className={classes["menu-button"]}
          onClick={menu.navigateToCurrentMonth}
        >
          <svg
            className={`${classes["icon"]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M32 0C23.1 0 14.6 3.7 8.6 10.2S-.6 25.4 .1 34.3L28.9 437.7c3 41.9 37.8 74.3 79.8 74.3l166.6 0c42 0 76.8-32.4 79.8-74.3L383.9 34.3c.6-8.9-2.4-17.6-8.5-24.1S360.9 0 352 0L32 0zM83 297.5L66.4 64l251.3 0L301 297.5 288 304c-20.1 10.1-43.9 10.1-64 0s-43.9-10.1-64 0s-43.9 10.1-64 0l-13-6.5zM256 196c0-24-33.7-70.1-52.2-93.5c-6.1-7.7-17.5-7.7-23.6 0C161.7 125.9 128 172 128 196c0 33.1 28.7 60 64 60s64-26.9 64-60z" />
          </svg>
          <span>{menu.translations.tracker}</span>
        </button>
        <Divider />
      </>
    ) : (
      ""
    );

  return (
    <div ref={menu.menuRef}>
      {!menu.open && (
        <div className={classes["menu-icon"]} onClick={menu.handleDrawerOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
      )}

      <Drawer
        sx={{
          width: WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: WIDTH,
          },
        }}
        variant="persistent"
        anchor="right"
        open={menu.open}
      >
        <button
          className={classes["menu-button"]}
          onClick={menu.handleDrawerClose}
        >
          <span className="mr-4">{menu.translations.close}</span>
          <svg
            className={`${classes["icon"]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
        <Divider />
        {currentMonthEl}
        {timeTraverseEl}
        <button className={classes["menu-button"]} onClick={menu.handleLogout}>
          <span className="mr-4">{menu.translations.logout}</span>
          <svg
            className={`${classes["icon"]}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
          </svg>
        </button>
        <ToggleButtonGroup
          className={classes["language-selection"]}
          value={menu.language}
          exclusive
          onChange={menu.handleLangChange}
          aria-label="text alignment"
        >
          <ToggleButton value={menu.Languages.en} aria-label="left aligned">
            {menu.Languages.en}
          </ToggleButton>
          <ToggleButton value={menu.Languages.de} aria-label="centered">
            {menu.Languages.de}
          </ToggleButton>
          <ToggleButton value={menu.Languages.ru} aria-label="right aligned">
            {menu.Languages.ru}
          </ToggleButton>
        </ToggleButtonGroup>
      </Drawer>
    </div>
  );
};

export default Menu;
