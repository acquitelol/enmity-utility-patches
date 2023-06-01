import { FormDivider, FormRow, FormSection, FormSwitch, ScrollView } from "enmity/components"
import { React } from "enmity/metro/common"
import { get, patchMap, set } from "./store"

export default () => {
    return <ScrollView>
        <FormSection title="Preferences">
            {Object.entries(patchMap).map(([patch, { title, subtitle, custom }], i, array) => {
                const disabled = !get(patch);

                return <>
                    <FormRow 
                        label={typeof title === "function" ? title() : title}
                        subLabel={typeof subtitle === "function" ? subtitle() : subtitle}
                        trailing={() => <FormSwitch
                            value={get(patch as keyof typeof patchMap)}
                            onValueChange={(value: boolean) => set(patch as keyof typeof patchMap, value)}
                        />}
                        disabled={disabled}
                    />
                    {custom?.(disabled) ?? <></>}
                    {i < (array.length - 1) && <FormDivider />}
                </>
            })}
        </FormSection>
    </ScrollView>
}