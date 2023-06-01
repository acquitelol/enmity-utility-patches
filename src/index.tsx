import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import Settings from "./common/settings";
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';
import { bulk, filters, getByName, getByProps } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';
import { React, Users } from 'enmity/metro/common';
import { get } from './common/store';

const Patcher = create('utils');

const [
    // -- Role Dots --
    { NativeModules: { DCDChatManager } },

    // -- Text Labels --
    FormLabel,
    { Text },
    { getSettingTitle },
    SettingsOverviewScreen,

    // -- Pronouns --
    Profile,

    // -- Media items per row --
    MediaItemManager,

    // -- JSON Uploading fix --
    FilesManager
] = bulk(
    filters.byProps("View", "Text", "NativeModules"),
    filters.byName("FormLabel", false),
    filters.byProps("TextStyleSheet"),
    filters.byProps("getSettingTitle"),
    filters.byName("SettingsOverviewScreen", false),
    filters.byProps("getUserProfile"),
    filters.byProps("getNumMediaItemsPerRow"),
    filters.byProps("addFiles", "popFirstFile")
)

const AddRoleDot: Plugin = {
    ...manifest,

    onStart() {
        // -- Role Dots --
        Patcher.before(DCDChatManager, "updateRows", (_, args) => {
            if (!get("roleDot")) return;

            const rows = JSON.parse(args[1]);

            for (const row of rows) {
                if (row.type === 1) {
                    row.message.shouldShowRoleDot = true
                    row.message.shouldShowRoleOnName = true
                }
            }

            args[1] = JSON.stringify(rows);
        });

        // -- Text Labels --
        Patcher.after(FormLabel, "default", (_, __, res) => {
            if (!get("headerPrimary")) return;

            res.props.color = "text-normal";
        })

        const unpatch = Patcher.after(SettingsOverviewScreen, "default", (_, __, res) => {
            unpatch();

            const { sections }: { sections: any[] } = findInReactTree(res, r => r.sections);
            const settings = sections
                .map(section => section.settings)
                .reduce((acc, obj) => [...acc, ...obj], [])
                .map(setting => getSettingTitle(setting))

            Patcher.before(Text, "render", (_, args) => {
                if (!get("headerPrimary")) return;

                if (args[0].variant === "text-md/semibold" 
                    && args[0].color === "header-primary"
                    && settings.includes(args[0].children)
                ) args[0].color = "text-normal";
            })
        });

        // -- Pronouns --
        Patcher.after(Profile, "getUserProfile", (_, args, res) => {
            if (args[0] !== Users.getCurrentUser().id || !get("pronouns", "")) return;
            res.pronouns ||= get("pronouns", "");
        })

        // -- Media items per row --
        Patcher.instead(MediaItemManager, "getNumMediaItemsPerRow", (self, args, orig) => get("mediaItems") 
            ? get("mediaItemsNumber", 2)
            : orig.apply(self, args));

        // -- JSON Uploading fix --
        Patcher.after(FilesManager, "addFiles", (_, args) => {
            if (!get("jsonFix")) return;

            args[0].files.forEach((file) => {
                file.mimeType === "application/json" && (file.mimeType = "text/plain")
            })
        })
   },

    onStop() {
        Patcher.unpatchAll();
    },

    getSettingsPanel() {
        return <Settings />
    }
};

registerPlugin(AddRoleDot);