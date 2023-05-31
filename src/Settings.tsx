import { FormRow, FormSection, FormSwitch } from "enmity/components"
import { React } from "enmity/metro/common"
import { get, patchMap, set } from "./store"

export default () => {
    return <FormSection title="Preferences">
        {Object.entries(patchMap).map(([patch, values]: any) => {
            return <FormRow 
                label={values[0] ?? "No title provided"}
                subLabel={values[1] ?? "No description provided"}
                trailing={() => <FormSwitch
                    value={get(patch)}
                    onValueChange={(value: boolean) => set(patch, value)}
                />}
            />
        })}
    </FormSection>
}