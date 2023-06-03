import { Toasts } from 'enmity/metro/common';
import { Patcher } from 'enmity/patcher';

import { get } from '../common/store';

export default {
    key: "toastFix",
    title: "Format Toasts",
    subtitle: "Adds a key to toasts when opened (if it doesn't exist) and renames 'source' to 'icon'.",
    icon: "ic_feedback_24px",
    
    patch(Patcher: Patcher) {
        Patcher.before(Toasts, "open", (_, args) => {
            if (!get(this.key)) return;

            args[0].source && (args[0].icon = args[0].source, delete args[0].source);
            args[0].key ||= Math.random().toString()
        });
    }
};
