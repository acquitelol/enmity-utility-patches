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
        "Force-enables role dots no matter what your accessibilty settings"
    ],
    headerPrimary: [
        "Fix Text Labels",
        "Makes all SettingRow text labels use text-normal instead of header-primary"
    ],
    mediaItems: [
        "Media Items",
        "Changes the amount of media items per row to 2 instead of the default 3"
    ],
    jsonFix: [
        "Upload JSON Files",
        "Fixes a long bug of Discord where JSON files couldn't be uploaded"
    ]
}

export const assignExisting = (prop: string) => {
    const settings = _get(manifest.name, "settings", {}) as Record<string, boolean>;
    (settings[prop] === undefined) && _set(manifest.name, "settings", { ...settings, [prop]: true }); 
}

export const init = () => Object.keys(patchMap).forEach(prop => assignExisting(prop));