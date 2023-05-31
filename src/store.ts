import manifest from '../manifest.json';
import { get as _get, set as _set } from 'enmity/api/settings';

export const get = (prop: keyof typeof patchMap) => (_get(manifest.name, "settings", {}) as Record<string, boolean>)[prop]
export const set = (prop: keyof typeof patchMap, value: boolean) => _set(manifest.name, "settings", { 
    ..._get(manifest.name, "settings", {}) as Record<string, boolean>, 
    [prop]: value 
});

export const patchMap = {
    roleDot: [
        "Add Role Dots",
        "Force-enables role-dots aswell with role-colors simultaneously disregarding your accessibility settings."
    ],
    headerPrimary: [
        "Fix Text Labels",
        "Forces all SettingRow and FormLabel Main text-labels use the 'text-normal' color instead of 'header-primary'."
    ],
    mediaItems: [
        "Media Items",
        "Changes the amount of media items per row to '2' instead of the default '3' in new Media Picker experiment."
    ],
    jsonFix: [
        "Upload JSON Files",
        "Fixes a long-lasting bug of Discord (where JSON files couldn't be uploaded) by changing the file's 'Mime-Type'."
    ]
}

export const assignExisting = (prop: keyof typeof patchMap) => {
    const settings = _get(manifest.name, "settings", {}) as Record<string, boolean>;
    (settings[prop] === undefined) && set(prop, true); 
}