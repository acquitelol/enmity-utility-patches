import { getByProps } from "enmity/metro";
import { Patcher } from "enmity/patcher";

import { get } from "../common/store";

const { NativeModules: { DCDChatManager } } = getByProps("View", "Text");

export default {
    key: "roleDots",
    title: "Add Role Dots",
    subtitle: "Force-enables role-dots aswell as role-colors disregarding your accessibility settings.",
    icon: "ic_members",

    patch(Patcher: Patcher) {
        Patcher.before(DCDChatManager, "updateRows", (_, args) => {
            if (!get(this.key)) return;
            
            const rows = JSON.parse(args[1]);

            for (const row of rows) {
                if (row.type === 1) {
                    row.message.shouldShowRoleDot = true;
                    row.message.shouldShowRoleOnName = true;
                };
            };

            args[1] = JSON.stringify(rows);
        });
    }
};
