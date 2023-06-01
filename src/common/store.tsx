import { getByName, getByProps, getModule } from 'enmity/metro';
import { Constants, React, Theme } from 'enmity/metro/common';
import manifest from '../../manifest.json';
import { Serializable, get as _get, set as _set } from 'enmity/api/settings';
import { FormInput, View } from 'enmity/components';

export const get = (prop: string, defaultValue?: Serializable) => _get(manifest.name, prop, defaultValue)
export const set = (prop: string, value: Serializable) => _set(manifest.name, prop, value);

export type PatchType = {
    title: (() => string) | string;
    subtitle: (() => string) | string;
    icon?: (() => string) | string;
    initCustom?: (disabled: boolean) => () => any
}

export const patchMap = {
    roleDot: {
        title: "Add Role Dots",
        subtitle: "Force-enables role-dots aswell as role-colors disregarding your accessibility settings.",
        icon: "ic_members"
    },
    headerPrimary: {
        title: "Fix Text Labels",
        subtitle: "Forces all Text Labels to use 'text-normal' instead of the default 'header-primary'.",
        icon: "ic_add_text"
    },
    earlyPronouns: {
        title: "Early Pronouns",
        subtitle: () => `Set your own pronouns to ${get("pronouns", "")} early. Keep in mind others will not be able to see this.`,
        icon: "ic_accessibility_24px",
        initCustom: (disabled: boolean) => {
            return () => <FormInput 
                placeholder="Your pronouns go here"
                title="Pronouns"
                value={get("pronouns", "")}
                onChange={(value: string) => set("pronouns", value)}
                disabled={disabled}
                style={{ marginTop: -16 }}
            />
        }
    },
    mediaItems: {
        title: "Media Items",
        subtitle: () => `Changes the amount of media items per row in media picker to '${get("mediaItemsNumber", 2)}' instead of the default '3'.`,
        icon: "ic_image",
        initCustom: (disabled: boolean) => {
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

            return () => <View 
                style={{ 
                    alignItems: "center", 
                    flexDirection: "row" 
                }}
            >
                {renderLabel(minimum)}
                <SliderComponent 
                    value={get("mediaItemsNumber", 2)}
                    minimumValue={minimum}
                    maximumValue={maximum}
                    style={{ flex: 1 }}
                    minimumTrackTintColor={resolveSemanticColor(Theme.theme, HEADER_PRIMARY)}
                    maximumTrackTintColor={resolveSemanticColor(Theme.theme, BACKGROUND_PRIMARY)}
                    step={1}
                    onValueChange={(value: number) => set("mediaItemsNumber", value)}
                    disabled={disabled}
                    tapToSeek
                />
                {renderLabel(maximum)}
            </View>
        }
    },
    jsonFix: {
        title: "Upload JSON Files",
        subtitle: "Fixes a long-lasting bug of Discord where JSON files couldn't be sent properly.",
        icon: "icon-qs-files"
    },
    expandableSheet: {
        title: "Expandable ActionSheets",
        subtitle: () => `Forces any User-Profile Action Sheets to always initially render as ${get("shouldExpand", false) ? "" : "non-"}expanded.`,
        icon: () => get("shouldExpand", false) ? "ic_chevron_up_24px" : "ic_chevron_down_24px",
        initCustom: (disabled: boolean) => {
            const { BadgableTabBar } = getByProps("BadgableTabBar");
            const tabs = [
                {
                    id: "false",
                    title: "Non-expanded",
                },
                {
                    id: "true",
                    title: "Expanded",
                }
            ]

            return () => {
                const [activeTab, setActiveTab] = React.useState(String(get("shouldExpand", false)));

                return <View 
                    style={{
                        opacity: disabled ? 0.5 : 1,
                        marginHorizontal: 16,
                        marginBottom: 12
                    }}
                >
                    <BadgableTabBar
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabSelected={(tab: string) => !disabled && (set("shouldExpand", JSON.parse(tab)), setActiveTab(tab))}
                    />
                </View>
            }
        }
    }
};
