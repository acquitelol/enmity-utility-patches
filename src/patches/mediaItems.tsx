import { Constants, React, Theme } from "enmity/metro/common";
import { getByProps } from "enmity/metro";
import { FormLabel, View } from "enmity/components";
import { Patcher } from 'enmity/patcher';

import { get, set } from "../common/store";
import { SliderComponent, meta } from "../common/modules";

const MediaItemManager = getByProps("getNumMediaItemsPerRow");
const { ThemeColorMap: { HEADER_PRIMARY, BACKGROUND_PRIMARY } } = Constants;
const renderLabel = (text: number | string, disabled: boolean) => (
    <FormLabel 
        text={text}
        color={"text-normal"}
        style={{ 
            marginHorizontal: 24,
            opacity: disabled ? 0.5 : 1
        }}
    />
);

export default {
    key: "mediaItems",
    title: "Media Items",
    subtitle: () => `Changes the amount of media items per row in media picker to '${get("mediaItemsNumber", 2)}' instead of the default '3'.`,
    icon: "ic_image",

    patch(Patcher: Patcher) {
        Patcher.instead(MediaItemManager, "getNumMediaItemsPerRow", (self, args, orig) => {
            if (!get(this.key)) return orig.apply(self, args);

            return get("mediaItemsNumber", 2);
        });
    },
    
    render(disabled: boolean) {
        const minimum = 1;
        const maximum = 8;

        return <View 
            style={{ 
                alignItems: "center", 
                flexDirection: "row" 
            }}
        >
            {renderLabel(minimum, disabled)}
            <SliderComponent 
                value={get("mediaItemsNumber", 2)}
                minimumValue={minimum}
                maximumValue={maximum}
                style={{ flex: 1 }}
                minimumTrackTintColor={meta.resolveSemanticColor(Theme.theme, HEADER_PRIMARY)}
                maximumTrackTintColor={meta.resolveSemanticColor(Theme.theme, BACKGROUND_PRIMARY)}
                step={1}
                onValueChange={(value: number) => set("mediaItemsNumber", value)}
                disabled={disabled}
                tapToSeek
            />
            {renderLabel(maximum, disabled)}
        </View>;
    }
};
