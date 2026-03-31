import "styled-components";

export type ThemeName = "light" | "dark";
type ColorKey = "primary" | "background" | "secondary" | "third";

export interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "brown",
    background: "lightgray",
    secondary: "blue",
    third: "green",
  },
};

export const dark: Theme = {
  name: "dark",
  color: {
    primary: "coral",
    background: "midnightblue",
    secondary: "blue",
    third: "green",
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
};
