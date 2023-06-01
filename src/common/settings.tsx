import { FormDivider, FormRow, FormSection, FormSwitch, ScrollView } from "enmity/components"
import { Constants, React, StyleSheet } from "enmity/metro/common"
import { PatchType, get, patchMap, set } from "./store"
import { getIDByName } from "enmity/api/assets"

const styles = StyleSheet.createThemedStyleSheet({
    view: {
        backgroundColor: Constants.ThemeColorMap.BACKGROUND_SECONDARY_ALT
    },
    section: {
        marginHorizontal: 16,
        borderRadius: 12
    },
    icon: {
        width: 12,
        height: 12
    }
})

export default () => {
    return <ScrollView style={styles.view}>
        <FormSection 
            title="Preferences"
            icon={<FormRow.Icon style={styles.icon} source={getIDByName("img_nitro_star")} />}
            sectionBodyStyle={styles.section}
            uppercaseTitle={false}
        >
            {Object.entries(patchMap).map(([patch, value], index, array) => {
                const { title, subtitle, icon, initCustom }: PatchType = value;
                const Custom = initCustom?.(!get(patch, true)) ?? (() => <></>);

                return <>
                    <FormRow 
                        label={title}
                        subLabel={typeof subtitle === "function" ? subtitle?.() : subtitle}
                        leading={icon && <FormRow.Icon source={getIDByName(typeof icon === "function" ? icon?.() : icon)} />}
                        trailing={() => <FormSwitch
                            value={get(patch, true)}
                            onValueChange={(value: boolean) => set(patch, Boolean(value))}
                        />}
                        disabled={!get(patch, true)}
                    />
                    <Custom />
                    {index < (array.length - 1) && <FormDivider />}
                </>
            })}
        </FormSection>
    </ScrollView>
};
