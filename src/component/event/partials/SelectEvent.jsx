import React, {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(eventType, selectedEventTypes, theme) {
    const isSelected = selectedEventTypes.indexOf(eventType.name) !== -1;

    return {
        fontWeight: isSelected ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
        color: isSelected ? 'green' : 'inherit',
    };
}

export default function MultipleSelectChip({eventTypes, callback}) {
    const theme = useTheme();
    const [selectedEventTypes, setSelectedEventTypes] = useState([]);
    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedEventTypes(
            typeof value === 'string' ? value.split(',') : value,
        );

    };
    useEffect(() => {
        callback(selectedEventTypes);
    }, [selectedEventTypes]);
    return (
        <div className="w-[80%] p-5 mx-auto">
            <FormControl sx={{width: '100%'}}>
                <InputLabel id="demo-multiple-chip-label">Loại sự kiện </InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedEventTypes}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Loại sự kiện"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {eventTypes.map((eventType) => (
                        <MenuItem
                            key={eventType.id}
                            value={eventType.name}
                            style={getStyles(eventType, selectedEventTypes, theme)}
                        >
                            {eventType.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
