import { Constants, Lodash, React, StyleSheet } from "enmity/metro/common";
import { FormDivider, FormRow, FormSection, FormSwitch, ScrollView } from "enmity/components";
import { getIDByName } from "enmity/api/assets";

import { PatchType, get, set } from "./store";
import { sections } from "../patches";

const styles = StyleSheet.createThemedStyleSheet({
    view: {
        backgroundColor: Constants.ThemeColorMap.BACKGROUND_SECONDARY_ALT
    },
    section: {
        marginHorizontal: 16,
        borderRadius: 12,
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
        width: 12,
        height: 12
    }
});

export default () => {
    return <ScrollView style={styles.view}>
        {Object.entries(sections).map(([title, { icon, patches }]) => {
            return <FormSection 
                title={Lodash.capitalize(title)}
                icon={<FormRow.Icon style={styles.icon} source={getIDByName(icon)} />}
                sectionBodyStyle={styles.section}
                uppercaseTitle={false}
            >
                {Object.entries(patches).map(([name, value], index, array) => {
                    const { title, subtitle, icon, render }: PatchType = value;
    
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
            </FormSection>
        })}
    </ScrollView>
};
