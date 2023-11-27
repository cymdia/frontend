import style from "../../styles/utils/_variables.module.scss";

export const theme = {
  token: {
    // Seed Token

    colorPrimary: "#0c2749",
    borderRadius: 2,
    colorText: "#00b96b",
    colorTextSecondary: style.accentColor,
    // Alias Token
    colorBgContainer: style.accentColor,
    colorBgLayout: "#ebebeb",
    fontFamily: "Rubik",
  },
  components: {
    Menu: {
      itemSelectedBg: style.accentColor,
      itemActiveBg: style.accentColor,
      itemColor: "#ffffff",
      itemHoverColor: "#ffffff",
      itemHoverBg: "transparent",
      itemBg: "transparent",
      itemSelectedColor: "#ffffff",
      horizontalItemHoverColor: "#ffffff",
      horizontalItemHoverBg: "transparent",
      horizontalItemSelectedBg: style.accentColor,
      horizontalItemSelectedColor: "#ffffff",
    },
  },
};
