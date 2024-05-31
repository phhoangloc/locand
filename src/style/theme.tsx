import React from "react";

export const color = {
    light: "#f9f2ec",
    dark: "#261a0d",
    main: "#996633",
    background_light: "#ffffff",
    background_dark: "#130d06"
}

export const themelight: React.CSSProperties = {
    background: color.light,
    color: color.dark
}

export const themedark: React.CSSProperties = {
    background: color.dark,
    color: color.light
}
