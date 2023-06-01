import { getByName, getByProps, getModule } from 'enmity/metro';
import { Constants, React, Theme } from 'enmity/metro/common';
import manifest from '../manifest.json';
import { Serializable, get as _get, set as _set } from 'enmity/api/settings';
import { FormInput, View } from 'enmity/components';

export const get = (prop: keyof typeof patchMap) => (_get(manifest.name, "settings", {}) as Record<string, boolean>)[prop]
export const set = (prop: keyof typeof patchMap, value: Serializable) => _set(manifest.name, "settings", { 
    ..._get(manifest.name, "settings", {}) as Record<string, boolean>, 
    [prop]: value 
});

export type PatchType = {
    title: (() => string) | string;
    subtitle: (() => string) | string;
    icon?: string;
    custom?: (disabled: boolean) => any
}

export const patchMap = {
    roleDot: {
        title: "Add Role Dots",
        subtitle: "Force-enables role-dots aswell as role-colors disregarding your accessibility settings.",
        icon: "ic_members"
    },
    headerPrimary: {
        title: "Fix Text Labels",
        subtitle: "Forces all Text Labels use the 'text-normal' color instead of the default 'header-primary'.",
        icon: "ic_add_text"
    },
    pronouns: {
        title: "Early Pronouns",
        subtitle: () => `Set your own pronouns to ${_get(manifest.name, "pronouns", "unspecified")}. Keep in mind others will not be able to see this.`,
        icon: "ic_accessibility_24px",
        custom: (disabled) => {
            return <FormInput 
                placeholder="Your pronouns go here"
                title="Pronouns"
                value={_get(manifest.name, "pronouns", "unspecified")}
                onChange={value => _set(manifest.name, "pronouns", value)}
            />
        }
    },
    mediaItems: {
        title: "Media Items",
        subtitle: () => `Changes the amount of media items per row in media picker to '${_get(manifest.name, "mediaItemsNumber", 2)}' instead of the default '3'.`,
        icon: "ic_image",
        custom: (disabled) => {
            const SliderComponent = getModule(x => x.render.name === "SliderComponent");
            const FormLabel = getByName("FormLabel");

            const { meta: { resolveSemanticColor } } = getByProps("colors", "meta");
            const { ThemeColorMap: { HEADER_PRIMARY, BACKGROUND_PRIMARY } } = Constants;
            const renderLabel = (text: number | string) => <FormLabel 
                text={text} 
                style={{ 
                    marginHorizontal: 24,
                    opacity: disabled ? 0.5 : 1
                }}
            />

            const minimum = 1;
            const maximum = 8;

            return <View style={{ alignItems: "center", flexDirection: "row" }}>
                {renderLabel(minimum)}
                <SliderComponent 
                    value={_get(manifest.name, "mediaItemsNumber", 2)}
                    minimumValue={minimum}
                    maximumValue={maximum}
                    style={{ flex: 1 }}
                    minimumTrackTintColor={resolveSemanticColor(Theme.theme, HEADER_PRIMARY)}
                    maximumTrackTintColor={resolveSemanticColor(Theme.theme, BACKGROUND_PRIMARY)}
                    step={1}
                    onValueChange={(value: number) => _set(manifest.name, "mediaItemsNumber", value)}
                    key={"media-items-number"}
                    disabled={disabled}
                    tapToSeek
                />
                {renderLabel(maximum)}
            </View>
        }
    },
    jsonFix: {
        title: "Upload JSON Files",
        subtitle: "Fixes a long-lasting bug of Discord where JSON files couldn't be uploaded and sent properly.",
        icon: "icon-qs-files"
    }
};

export const assignExisting = (prop: keyof typeof patchMap) => {
    const settings = _get(manifest.name, "settings", {}) as Record<string, boolean>;
    (settings[prop] === undefined) && set(prop, true); 
}