import { getByProps } from 'enmity/metro';
import { Patcher } from 'enmity/patcher';

import { get } from '../common/store';

const FilesManager = getByProps("addFiles", "popFirstFile");

export default {
    key: "jsonFix",
    title: "Upload JSON Files",
    subtitle: "Fixes a long-lasting bug of Discord where JSON files couldn't be sent properly.",
    icon: "icon-qs-files",
    
    patch(Patcher: Patcher) {
        Patcher.after(FilesManager, "addFiles", (_, args) => {
            if (!get(this.key)) return;

            args[0].files.forEach((file) => {
                file.mimeType === "application/json" && (file.mimeType = "text/plain");
            });
        });
    }
};
