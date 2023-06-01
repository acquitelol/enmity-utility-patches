import { React } from 'enmity/metro/common';
import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { create } from 'enmity/patcher';

import Settings from "./common/settings";
import manifest from '../manifest.json';
import { patchAll } from './patches';

const Patcher = create(manifest.name);

const UtilityPatches: Plugin = {
    ...manifest,

    onStart() {
        patchAll(Patcher);
    },

    onStop() {
        Patcher.unpatchAll();
    },

    getSettingsPanel() {
        return <Settings />;
    }
};

registerPlugin(UtilityPatches);
