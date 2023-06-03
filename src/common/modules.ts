import { getByProps, getModule } from "enmity/metro";

export const { BadgableTabBar } = getByProps("BadgableTabBar");
export const SliderComponent = getModule(x => x.render.name === "SliderComponent");
export const TextModule = getByProps("TextStyleSheet", "Text");
export const { colors, meta } = getByProps("colors", "meta");
export const { GenericHeaderTitle, GenericSubHeaderTitle } = getByProps("GenericHeaderTitle");
export const { LayoutAnimation: { configureNext } } = getByProps("View", "Text");
