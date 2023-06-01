import { getByName, getByProps, getModule } from 'enmity/metro';
import { Constants, React, Theme } from 'enmity/metro/common';
import manifest from '../manifest.json';
import { Serializable, get as _get, set as _set } from 'enmity/api/settings';
import { View } from 'enmity/components';

export const get = (prop: keyof typeof patchMap) => (_get(manifest.name, "settings", {}) as Record<string, boolean>)[prop]
export const set = (prop: keyof typeof patchMap, value: Serializable) => _set(manifest.name, "settings", { 
    ..._get(manifest.name, "settings", {}) as Record<string, boolean>, 
    [prop]: value 
});

export const patchMap = {
    roleDot: {
        title: "Add Role Dots",
        subtitle: "Force-enables role-dots aswell with role-colors simultaneously disregarding your accessibility settings.",
    },
    headerPrimary: {
        title: "Fix Text Labels",
        subtitle: "Forces all SettingRow and FormLabel Main text-labels use the 'text-normal' color instead of 'header-primary'."
    },
    mediaItems: {
        title: "Media Items",
        subtitle: () => `Changes the amount of media items per row to '${_get(manifest.name, "mediaItemsNumber", 2)}' instead of the default '3' in new Media Picker experiment.`,
        custom: (disabled) => {
            const SliderComponent = getModule(x => x.render.name === "SliderComponent");
            const FormLabel = getByName("FormLabel");

            const { meta: { resolveSemanticColor } } = getByProps("colors", "meta");
            const { ThemeColorMap: { HEADER_PRIMARY, BACKGROUND_PRIMARY } } = Constants;
            const renderLabel = (text: number | string, direction: "Left" | "Right") => <FormLabel 
                text={text} 
                style={{ 
                    [`margin${direction}`]: 16,
                    opacity: disabled ? 0.5 : 1
                }}
            />

            const minimum = 1;
            const maximum = 8;

            return <View style={{ alignItems: "center", flexDirection: "row" }}>
                {renderLabel(minimum, "Left")}
                <SliderComponent 
                    value={_get(manifest.name, "mediaItemsNumber", 2)}
                    minimumValue={minimum}
                    maximumValue={maximum}
                    style={{ marginHorizontal: 16, flex: 1 }}
                    minimumTrackTintColor={resolveSemanticColor(Theme.theme, HEADER_PRIMARY)}
                    maximumTrackTintColor={resolveSemanticColor(Theme.theme, BACKGROUND_PRIMARY)}
                    step={1}
                    onValueChange={(value: number) => _set(manifest.name, "mediaItemsNumber", value)}
                    key={"media-items-number"}
                    disabled={disabled}
                    tapToSeek
                />
                {renderLabel(maximum, "Right")}
            </View>
        }
    },
    jsonFix: {
        title: "Upload JSON Files",
        subtitle: "Fixes a long-lasting bug of Discord (where JSON files couldn't be uploaded) by changing the file's 'Mime-Type'."
    }
} as {
    [x: string]: {
        title: Function | string,
        subtitle: Function | string,
        custom?: (disabled: boolean) => any
    }
};

export const assignExisting = (prop: keyof typeof patchMap) => {
    const settings = _get(manifest.name, "settings", {}) as Record<string, boolean>;
    (settings[prop] === undefined) && set(prop, true); 
}