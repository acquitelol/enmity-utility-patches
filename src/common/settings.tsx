import { Constants, Lodash, React, StyleSheet } from "enmity/metro/common";
import { FormDivider, FormRow, FormSection, FormSwitch, ScrollView, TouchableOpacity, View } from "enmity/components";
import { getIDByName } from "enmity/api/assets";

import { get, set } from "./store";
import { sections } from "../patches";
import manifest from '../../manifest.json';
import { 
    GenericHeaderTitle, 
    GenericSubHeaderTitle,
    configureNext 
} from "./modules";

const styles = StyleSheet.createThemedStyleSheet({
    view: {
        backgroundColor: Constants.ThemeColorMap.BACKGROUND_SECONDARY_ALT
    },
    titles: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        marginBottom: -15
    },
    section: {
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4.65,
        elevation: 8
    },
    icon: {
        width: 16,
        height: 16,
        marginHorizontal: 4
    },
    space: {
        marginBottom: 50
    }
});

export const ToggleableSection = ({ icon, children, ...rest }: any) => {
    const [hidden, setHidden] = React.useState(false);

    return <FormSection
        icon={<View style={{ flexDirection: "row" }}>
            {icon}
            <TouchableOpacity
                onPress={() => {
                    setHidden((previous: boolean) => !previous);
                    configureNext({ 
                        duration: 300,
                        create: { 
                            type: 'keyboard', 
                            property: 'scaleXY' 
                        },
                        update: {
                            type: "easeInEaseOut",
                            property: "scaleY"
                        },
                        delete: {
                            type: "easeInEaseOut",
                            property: "opacity"
                        }
                    });
                }}
            >
                <FormRow.Icon 
                    source={getIDByName(`ic_arrow${hidden ? "" : "_down"}`)} 
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>}
        {...rest}
    >
        {hidden || children}
    </FormSection>
}

export default () => {
    return <ScrollView style={styles.view}>
        <View style={styles.titles}>
            <GenericHeaderTitle title={"Customize your ideal experience."} />
            <GenericSubHeaderTitle subtitle={manifest.description} />
        </View>
        <View style={styles.section}>
            {Object.entries(sections).map(([title, { icon, patches }]) => {
                return <ToggleableSection 
                    title={Lodash.capitalize(title)}
                    icon={<FormRow.Icon style={styles.icon} source={getIDByName(icon)} />}
                    inset
                    sectionBodyStyle={{ borderRadius: 12 }}
                    uppercaseTitle={false}
                >
                    {Object.entries(patches).map(([name, value], index, array) => {
                        const { title, subtitle, icon, render } = value;
        
                        return <>
                            <FormRow 
                                label={title}
                                subLabel={typeof subtitle === "function" ? subtitle?.() : subtitle}
                                leading={icon && <FormRow.Icon source={getIDByName(typeof icon === "function" ? icon?.() : icon)} />}
                                trailing={() => <FormSwitch
                                    value={!!get(name, true)}
                                    onValueChange={(value: boolean) => set(name, !!value)}
                                />}
                                disabled={!get(name, true)}
                            />
                            {render?.(!get(name, true)) ?? <></>}
                            {index < (array.length - 1) && <FormDivider />}
                        </>
                    })}
                </ToggleableSection>
            })}
        </View>
        <View style={styles.space} />
    </ScrollView>
};
