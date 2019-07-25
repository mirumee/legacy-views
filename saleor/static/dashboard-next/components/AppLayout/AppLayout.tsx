import MenuItem from "@material-ui/core/MenuItem";
import { Theme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
import { matchPath } from "react-router";
import useRouter from "use-react-router";

import useNavigator from "@saleor/hooks/useNavigator";
import useTheme from "@saleor/hooks/useTheme";
import useUser from "@saleor/hooks/useUser";
import { createHref, maybe } from "@saleor/misc";
import { orderDraftListUrl, orderListUrl } from "@saleor/orders/urls";
import saleorDarkLogoSmall from "../../../images/logo-dark-small.svg";
import saleorDarkLogo from "../../../images/logo-dark.svg";
import i18n from "../../i18n";
import menuStructure from "./menuStructure";
import ThemeSwitch from "./ThemeSwitch";

import MacawAppLayout from "@ui/AppLayout";
import { IMenuItem } from "@ui/AppLayout/types";
import useAppLayout from "@ui/hooks/useAppLayout";

interface AppLayoutProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  themeSwitch: {
    marginRight: theme.spacing.unit * 2
  }
}));

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const classes = useStyles({});
  const { logout, user } = useUser();
  const navigate = useNavigator();
  const {
    location: { pathname }
  } = useRouter();
  const { menu } = useAppLayout();

  const handleLogout = () => {
    close();
    logout();
  };

  const handleMenuItemClick = (url: string) => navigate(url);

  const isMenuActive = (menuItem: IMenuItem) =>
    pathname.split("?")[0] === orderDraftListUrl().split("?")[0] &&
    menuItem.url.split("?")[0] === orderListUrl().split("?")[0]
      ? false
      : !!matchPath(pathname.split("?")[0], {
          exact: menuItem.url.split("?")[0] === "/",
          path: menuItem.url.split("?")[0]
        });

  const menus = menuStructure.filter(menuItem =>
    user.permissions
      .map(permission => permission.code)
      .includes(menuItem.permission)
  );

  return (
    <MacawAppLayout
      createHref={createHref}
      isMenuActive={isMenuActive}
      logoSrc={menu.isExpanded ? saleorDarkLogo : saleorDarkLogoSmall}
      menuStructure={menus}
      user={{
        avatar: maybe(() => user.avatar.url),
        name: user.email
      }}
      userBar={
        <ThemeSwitch
          className={classes.themeSwitch}
          checked={isDark}
          onClick={toggleTheme}
        />
      }
      userMenu={
        <MenuItem onClick={handleLogout}>
          {i18n.t("Log out", {
            context: "button"
          })}
        </MenuItem>
      }
      onMenuItemClick={handleMenuItemClick}
    >
      {children}
    </MacawAppLayout>
  );
};

export default AppLayout;
