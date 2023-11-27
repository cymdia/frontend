import style from "../../styles/utils/_variables.module.scss";

export const theme = {
  token: {
    // Seed Token

    colorPrimary: "#0c2749",
    borderRadius: 2,
    colorText: style.blueDarkColor,
    colorTextSecondary: style.accentColor,
    // Alias Token
    colorBgContainer: style.accentColor,
    colorBgLayout: style.primaryBackgroundColor,
    fontFamily: "Rubik",
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
  },
};
