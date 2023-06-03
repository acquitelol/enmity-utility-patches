import { Patcher } from 'enmity/patcher';
import { Section } from '../common/store';

import roleDots from "./roleDots";
import headerPrimary from "./headerPrimary";
import earlyPronouns from "./earlyPronouns";
import mediaItems from "./mediaItems";
import jsonFix from "./jsonFix";
import toastFix from "./toastFix";
import expandableSheet from "./expandableSheet";

export const sections: Record<string, Section> = {
    recommended: {
        icon: "img_nitro_star",
        patches: {
            headerPrimary,
            jsonFix,
            toastFix
        }
    },
    preferences: {
        icon: "ic_pencil_24px",
        patches: {
            roleDots,
            mediaItems,
            earlyPronouns,
            expandableSheet
        }
    }
};

export const patchAll = (Patcher: Patcher) => Object.values(sections)
    .forEach(section => {
        Object.values(section.patches)
            .forEach(value => {
                try {
                    value.patch(Patcher);
                } catch (e) {
                    console.error(`Patch '${value.title}' (${value.key}) errored with '${e.message ?? e}'.`);
                };
            });
    });
