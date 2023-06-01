import { FormDivider, FormRow, FormSection, FormSwitch, ScrollView } from "enmity/components"
import { React } from "enmity/metro/common"
import { PatchType, get, patchMap, set } from "./store"
import { getIDByName } from "enmity/api/assets"

export default () => {
    return <ScrollView>
        <FormSection title="Preferences">
            {Object.entries(patchMap).map(([patch, value], index, array) => {
                const { title, subtitle, icon, custom }: PatchType = value;
                const disabled = !get(patch, true);

                return <>
                    <FormRow 
                        label={title}
                        subLabel={typeof subtitle === "function" ? subtitle?.() : subtitle}
                        leading={icon && <FormRow.Icon source={getIDByName(icon)} />}
                        trailing={() => <FormSwitch
                            value={get(patch, true)}
                            onValueChange={(value: boolean) => set(patch, value)}
                        />}
                        disabled={disabled}
                    />
                    {custom?.(disabled) ?? <></>}
                    {index < (array.length - 1) && <FormDivider />}
                </>
            })}
        </FormSection>
    </ScrollView>
}