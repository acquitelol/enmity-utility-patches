import { getByName, getByProps } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';
import { Patcher } from 'enmity/patcher';

import { TextModule } from '../common/modules';
import { get } from '../common/store';

const { Text } = TextModule;
const SettingsOverviewScreen = getByName("SettingsOverviewScreen", { default: false });
const FormLabel = getByName("FormLabel", { default: false });
const { getSettingTitle } = getByProps("getSettingTitle");

export default {
    key: "headerPrimary",
    title: "Fix Text Labels",
    subtitle: "Forces all Text Labels to use 'text-normal' instead of the default 'header-primary'.",
    icon: "ic_add_text",

    patch(Patcher: Patcher) {
        Patcher.after(FormLabel, "default", (_, __, res) => {
            if (!get(this.key)) return;

            res.props.color === "header-primary" && (res.props.color = "text-normal");
        })

        const unpatch = Patcher.after(SettingsOverviewScreen, "default", (_, __, res) => {
            unpatch();

            const { sections }: { sections: any[] } = findInReactTree(res, r => r.sections);
            const settings = sections
                .map(section => section.settings)
                .reduce((acc, obj) => [...acc, ...obj], [])
                .map((setting: string) => getSettingTitle(setting));

            Patcher.before(Text, "render", (_, args) => {
                if (!get(this.key)) return;

                if (args[0].variant === "text-md/semibold" 
                    && args[0].color === "header-primary"
                    && settings.includes(args[0].children)
                ) args[0].color = "text-normal";
            });
        });
    }
};
