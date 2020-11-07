import React, { useState } from 'react'
import { FormControl } from 'baseui/form-control';
import { Select, SIZE, TYPE } from 'baseui/select';

function Option({ name }) {
    const [value, setValue] = useState([{ label: "Enabled", id: '1' }]);
    return (
        <div>
            <FormControl
                label={() => `${name}`}
            >
                <Select
                    size={SIZE.compact}
                    options={[
                        { label: "Enabled", id: "1" },
                        { label: "Disabled", id: "0" },
                    ]}
                    closeOnSelect
                    clearable={false}
                    value={value}
                    onChange={({ value }) => setValue(value)}
                />
            </FormControl>
        </div>
    )
}

export default Option