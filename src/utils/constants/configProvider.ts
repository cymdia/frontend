import { ThemeConfig } from "antd/es/config-provider";
import style from "../../styles/utils/_variables.module.scss";

export const theme: ThemeConfig = {
  token: {
    // Seed Token

    colorPrimary: "#0c2749",
    borderRadius: 2,
    colorText: style.blueDarkColor,
    colorTextSecondary: style.accentColor,
    // Alias Token
    colorBgContainer: style.whiteColor,
    colorBgLayout: style.primaryBackgroundColor,

    fontFamily: "Rubik",
    colorPrimaryBgHover: style.accentWhiteColor,
  },
  components: {
    Menu: {
      itemSelectedBg: style.accentColor,
      itemActiveBg: style.accentColor,
      itemColor: style.whiteColor,
      itemHoverColor: style.whiteColor,
      itemHoverBg: "transparent",
      itemBg: "transparent",
      itemSelectedColor: style.whiteColor,
      horizontalItemHoverColor: style.whiteColor,
      horizontalItemHoverBg: "transparent",
      horizontalItemSelectedBg: style.accentColor,
      horizontalItemSelectedColor: style.whiteColor,
    },
    Table: {
      bodySortBg: style.whiteColor,
      colorText: style.greyDarkColor,
    },
    Button: {
      colorPrimaryBgHover: style.accentWhiteColor,
      colorPrimaryBg: style.accentColor,
    },
  },
};
