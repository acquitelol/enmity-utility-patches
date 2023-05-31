function F(o){window.enmity.plugins.registerPlugin(o)}const{components:e}=window.enmity;e.Alert,e.Button,e.FlatList,e.Image,e.ImageBackground,e.KeyboardAvoidingView,e.Modal,e.Pressable,e.RefreshControl,e.ScrollView,e.SectionList,e.StatusBar,e.StyleSheet,e.Switch,e.Text,e.TextInput,e.TouchableHighlight,e.TouchableOpacity,e.TouchableWithoutFeedback,e.Touchable,e.View,e.VirtualizedList,e.Form,e.FormArrow,e.FormCTA,e.FormCTAButton,e.FormCardSection,e.FormCheckbox,e.FormDivider,e.FormHint,e.FormIcon,e.FormInput,e.FormLabel,e.FormRadio;const f=e.FormRow,S=e.FormSection;e.FormSelect,e.FormSubLabel;const b=e.FormSwitch;e.FormTernaryCheckBox,e.FormText,e.FormTextColors,e.FormTextSizes,window.enmity.modules.common.Constants,window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const w=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage,window.enmity.modules.common.Toasts,window.enmity.modules.common.Dialog,window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings,window.enmity.modules.common.Users,window.enmity.modules.common.Navigation,window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking,window.enmity.modules.common.StyleSheet,window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;var v="UtilityPatches",T="1.1.3",x="Minor patches/fixes all bundled into a single plugin for convenience.",N="#ff0069",R=[{name:"Rosie<3",id:"581573474296791211"}],d={name:v,version:T,description:x,color:N,authors:R};function C(o,t,n){window.enmity.settings.set(o,t,n)}function u(o,t,n){return window.enmity.settings.get(o,t,n)}const l=o=>u(d.name,"settings",{})[o],y=(o,t)=>C(d.name,"settings",{...u(d.name,"settings",{}),[o]:t}),g={roleDot:["Add Role Dots","Force-enables role-dots aswell with role-colors simultaneously disregarding your accessibility settings."],headerPrimary:["Fix Text Labels","Forces all SettingRow and FormLabel Main text-labels use the 'text-normal' color instead of 'header-primary'."],mediaItems:["Media Items","Changes the amount of media items per row to '2' instead of the default '3' in new Media Picker experiment."],jsonFix:["Upload JSON Files","Fixes a long-lasting bug of Discord (where JSON files couldn't be uploaded) by changing the file's 'Mime-Type'."]},M=o=>{u(d.name,"settings",{})[o]===void 0&&y(o,!0)};var P=()=>w.createElement(S,{title:"Preferences"},Object.entries(g).map(([o,t])=>{var n,i;return w.createElement(f,{label:(n=t[0])!=null?n:"No title provided",subLabel:(i=t[1])!=null?i:"No description provided",trailing:()=>w.createElement(b,{value:l(o),onValueChange:s=>y(o,s)})})}));function L(o){return window.enmity.patcher.create(o)}function c(...o){return window.enmity.modules.getByProps(...o)}function h(...o){return window.enmity.modules.getByName(...o)}window.enmity.modules.common;function I(o,t,n){return window.enmity.utilities.findInReactTree(o,t,n)}const r=L("utils"),{NativeModules:{DCDChatManager:D}}=c("View","Text","NativeModules"),k=h("FormLabel",{default:!1}),{Text:A}=c("TextStyleSheet"),{getSettingTitle:B}=c("getSettingTitle"),O=h("SettingsOverviewScreen",{default:!1}),E=c("addFiles","popFirstFile"),V=c("getNumMediaItemsPerRow"),j={...d,onStart(){Object.keys(g).forEach(t=>M(t)),r.before(D,"updateRows",(t,n)=>{if(!l("roleDot"))return;const i=JSON.parse(n[1]);for(const s of i)s.type===1&&(s.message.shouldShowRoleDot=!0,s.message.shouldShowRoleOnName=!0);n[1]=JSON.stringify(i)}),r.after(k,"default",(t,n,i)=>{!l("headerPrimary")||(i.props.color="text-normal")});const o=r.after(O,"default",(t,n,i)=>{o();const{sections:s}=I(i,m=>m.sections),p=s.map(m=>m.settings).reduce((m,a)=>[...m,...a],[]).map(m=>B(m));r.before(A,"render",(m,a)=>{!l("headerPrimary")||a[0].variant==="text-md/semibold"&&a[0].color==="header-primary"&&p.includes(a[0].children)&&(a[0].color="text-normal")})});r.instead(V,"getNumMediaItemsPerRow",(t,n,i)=>l("mediaItems")?2:i.apply(t,n)),r.after(E,"addFiles",(t,n)=>{!l("jsonFix")||n[0].files.forEach(i=>{i.mimeType==="application/json"&&(i.mimeType="text/plain")})})},onStop(){r.unpatchAll()},getSettingsPanel(){return w.createElement(P,null)}};F(j);