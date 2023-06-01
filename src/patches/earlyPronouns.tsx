import { React, Users } from "enmity/metro/common";
import { getByProps } from "enmity/metro";
import { FormInput } from "enmity/components";
import { Patcher } from 'enmity/patcher';

import { get, set } from "../common/store";

const Profile = getByProps("getUserProfile");

export default {
    key: "earlyPronouns",
    title: "Early Pronouns",
    subtitle: () => `Set your own pronouns to ${get("pronouns", "")} early. Keep in mind others will not be able to see this.`,
    icon: "ic_accessibility_24px",

    patch(Patcher: Patcher) {
        Patcher.after(Profile, "getUserProfile", (_, args, res) => {
            if (args[0] !== Users.getCurrentUser().id || !res
            || !get(this.key) || !get("pronouns", ""))  return;

            res.pronouns ||= get("pronouns", "");
        });
    },

    render(disabled: boolean) {
        return <FormInput 
            placeholder="Your pronouns go here"
            title="Pronouns"
            value={get("pronouns", "")}
            onChange={(value: string) => set("pronouns", value)}
            disabled={disabled}
            style={{ marginTop: -16 }}
        />;
    }
};
