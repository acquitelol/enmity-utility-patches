import manifest from '../../manifest.json';
import { Serializable, get as _get, set as _set } from 'enmity/api/settings';
import { Patcher } from 'enmity/patcher';

export const get = (prop: string, defaultValue: Serializable = true) => _get(manifest.name, prop, defaultValue)
export const set = (prop: string, value: Serializable) => _set(manifest.name, prop, value);

export type Section = {
    icon: string;
    patches: Record<string, Patch>;
}

export type Patch = {
    key: string;
    title: (() => string) | string;
    subtitle: (() => string) | string;
    icon?: (() => string) | string;
    patch: (Patcher: Patcher) => any;
    render?(disabled: boolean): any;
};