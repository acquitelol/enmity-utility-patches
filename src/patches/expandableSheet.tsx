import { React } from "enmity/metro/common";
import { getModule } from "enmity/metro";
import { View } from "enmity/components";
import { Patcher } from 'enmity/patcher';

import { get, set } from "../common/store";
import { BadgableTabBar } from "../common/modules";

const { default: ActionSheet } = getModule(x => x?.default?.render?.name === "ActionSheet");

export default {
    key: "expandableSheet",
    title: "Expandable ActionSheets",
    subtitle: () => `Forces any User-Profile Action Sheets to always initially render as ${get("shouldExpand", false) ? "" : "non-"}expanded.`,
    icon: () => `ic_chevron_${get("shouldExpand", false) ? "up" : "down" }_24px`,

    patch(Patcher: Patcher) {
        Patcher.before(ActionSheet, "render", (_, args) => {
            if (!args[0].startExpanded || !get(this.key)) return;

            args[0].startExpanded = get("shouldExpand", false);
        })
    },

    render(disabled: boolean) {
        const [activeTab, setActiveTab] = React.useState(String(!!get("shouldExpand", false)));
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
                onTabSelected={(tab: string) => !disabled && (
                    set("shouldExpand", JSON.parse(tab)), 
                    setActiveTab(tab)
                )}
            />
        </View>;
    }
};
