import { Plugin, registerPlugin } from "enmity/managers/plugins";
import Manifest from "../manifest.json";
import { getByProps, getModule } from "enmity/modules";
import { create } from "enmity/patcher";
import { code_block } from "./utils";

const MessagesModule = getByProps("sendMessage");
const UploadsModule = getByProps("uploadLocalFiles");

const Patcher = create("[BetterCodeBlocks]");

const BetterCodeBlocks: Plugin = {
  ...Manifest,
  patches: [],

  onStart() {

    Patcher.before(MessagesModule, "sendMessage", (_, args, __) => {
      const content = args[1]["content"];
      const code = content.match(/[```].*[\s\S]*?(?=\n.*?=|$)/);
      code.replaceAll(/```.*/, '')
      const final_image = code_block(code) 
      console.log(final_image)
    });

    Patcher.before(UploadsModule, "uploadLocalFiles", (_, args, __) => {
      args[3].content = args[3].content.replaceAll("media.discordapp.net", "cdn.discordapp.com")
    });
  },

  onStop() {
    Patcher.unpatchAll()
  }
}

registerPlugin(BetterCodeBlocks);