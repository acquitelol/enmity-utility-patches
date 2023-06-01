function v(o){window.enmity.plugins.registerPlugin(o)}const{components:e}=window.enmity;e.Alert,e.Button,e.FlatList,e.Image,e.ImageBackground,e.KeyboardAvoidingView,e.Modal,e.Pressable,e.RefreshControl;const x=e.ScrollView;e.SectionList,e.StatusBar,e.StyleSheet,e.Switch,e.Text,e.TextInput,e.TouchableHighlight,e.TouchableOpacity,e.TouchableWithoutFeedback,e.Touchable;const C=e.View;e.VirtualizedList,e.Form,e.FormArrow,e.FormCTA,e.FormCTAButton,e.FormCardSection,e.FormCheckbox;const N=e.FormDivider;e.FormHint,e.FormIcon;const I=e.FormInput;e.FormLabel,e.FormRadio;const F=e.FormRow,R=e.FormSection;e.FormSelect,e.FormSubLabel;const P=e.FormSwitch;e.FormTernaryCheckBox,e.FormText,e.FormTextColors,e.FormTextSizes;const E=window.enmity.modules.common.Constants;window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const r=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage,window.enmity.modules.common.Toasts,window.enmity.modules.common.Dialog,window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings;const M=window.enmity.modules.common.Users;window.enmity.modules.common.Navigation,window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack;const S=window.enmity.modules.common.Theme;window.enmity.modules.common.Linking,window.enmity.modules.common.StyleSheet,window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;function D(o,t){return window.enmity.modules.getModule(o,t)}function u(...o){return window.enmity.modules.getByProps(...o)}function p(...o){return window.enmity.modules.getByName(...o)}window.enmity.modules.common;var L="UtilityPatches",A="1.1.5",k="Minor patches/fixes all bundled into a single plugin for convenience.",B="#ff0069",V=[{name:"Rosie<3",id:"581573474296791211"}],g={name:L,version:A,description:k,color:B,authors:V};function h(o,t,n){window.enmity.settings.set(o,t,n)}function O(o,t,n){return window.enmity.settings.get(o,t,n)}const s=(o,t)=>O(g.name,o,t),_=(o,t)=>h(g.name,o,t),U={roleDot:{title:"Add Role Dots",subtitle:"Force-enables role-dots aswell as role-colors disregarding your accessibility settings.",icon:"ic_members"},headerPrimary:{title:"Fix Text Labels",subtitle:"Forces all Text Labels use the 'text-normal' color instead of the default 'header-primary'.",icon:"ic_add_text"},earlyPronouns:{title:"Early Pronouns",subtitle:()=>`Set your own pronouns to ${s("pronouns","unspecified")}. Keep in mind others will not be able to see this.`,icon:"ic_accessibility_24px",custom:o=>r.createElement(I,{placeholder:"Your pronouns go here",title:"Pronouns",value:s("pronouns","unspecified"),onChange:t=>h(g.name,"pronouns",t),disabled:o,style:{marginTop:-16}})},mediaItems:{title:"Media Items",subtitle:()=>`Changes the amount of media items per row in media picker to '${s("mediaItemsNumber",2)}' instead of the default '3'.`,icon:"ic_image",custom:o=>{const t=D(c=>c.render.name==="SliderComponent"),n=p("FormLabel"),{meta:{resolveSemanticColor:i}}=u("colors","meta"),{ThemeColorMap:{HEADER_PRIMARY:a,BACKGROUND_PRIMARY:w}}=E,m=c=>r.createElement(n,{text:c,style:{marginHorizontal:24,opacity:o?.5:1}}),l=1,y=8;return r.createElement(C,{style:{alignItems:"center",flexDirection:"row"}},m(l),r.createElement(t,{value:s("mediaItemsNumber",2),minimumValue:l,maximumValue:y,style:{flex:1},minimumTrackTintColor:i(S.theme,a),maximumTrackTintColor:i(S.theme,w),step:1,onValueChange:c=>h(g.name,"mediaItemsNumber",c),key:"media-items-number",disabled:o,tapToSeek:!0}),m(y))}},jsonFix:{title:"Upload JSON Files",subtitle:"Fixes a long-lasting bug of Discord where JSON files couldn't be uploaded and sent properly.",icon:"icon-qs-files"}};function j(o){return window.enmity.assets.getIDByName(o)}var H=()=>r.createElement(x,null,r.createElement(R,{title:"Preferences"},Object.entries(U).map(([o,t],n,i)=>{var a;const{title:w,subtitle:m,icon:l,custom:y}=t,[c,T]=r.useState(s(o,!0)),f=!s(o,!0);return r.createElement(r.Fragment,null,r.createElement(F,{label:w,subLabel:typeof m=="function"?m==null?void 0:m():m,leading:l&&r.createElement(F.Icon,{source:j(l)}),trailing:()=>r.createElement(P,{value:c,onValueChange:b=>(_(o,b),T(b))}),disabled:f}),(a=y==null?void 0:y(f))!=null?a:r.createElement(r.Fragment,null),n<i.length-1&&r.createElement(N,null))})));function J(o){return window.enmity.patcher.create(o)}function $(o,t,n){return window.enmity.utilities.findInReactTree(o,t,n)}const d=J("utils"),{NativeModules:{DCDChatManager:z}}=u("View","Text","NativeModules"),K=p("FormLabel",{default:!1}),{Text:Y}=u("TextStyleSheet"),{getSettingTitle:G}=u("getSettingTitle"),q=p("SettingsOverviewScreen",{default:!1}),W=u("addFiles","popFirstFile"),Q=u("getNumMediaItemsPerRow"),X=u("getUserProfile"),Z={...g,onStart(){d.before(z,"updateRows",(t,n)=>{if(!s("roleDot"))return;const i=JSON.parse(n[1]);for(const a of i)a.type===1&&(a.message.shouldShowRoleDot=!0,a.message.shouldShowRoleOnName=!0);n[1]=JSON.stringify(i)}),d.after(K,"default",(t,n,i)=>{!s("headerPrimary")||(i.props.color="text-normal")});const o=d.after(q,"default",(t,n,i)=>{o();const{sections:a}=$(i,m=>m.sections),w=a.map(m=>m.settings).reduce((m,l)=>[...m,...l],[]).map(m=>G(m));d.before(Y,"render",(m,l)=>{!s("headerPrimary")||l[0].variant==="text-md/semibold"&&l[0].color==="header-primary"&&w.includes(l[0].children)&&(l[0].color="text-normal")})});d.instead(Q,"getNumMediaItemsPerRow",(t,n,i)=>s("mediaItems")?s("mediaItemsNumber",2):i.apply(t,n)),d.after(W,"addFiles",(t,n)=>{!s("jsonFix")||n[0].files.forEach(i=>{i.mimeType==="application/json"&&(i.mimeType="text/plain")})}),d.after(X,"getUserProfile",(t,n,i)=>{n[0]!==M.getCurrentUser().id||!s("pronouns")||i.pronouns||(i.pronouns=s("pronouns","unspecified"))})},onStop(){d.unpatchAll()},getSettingsPanel(){return r.createElement(H,null)}};v(Z);
