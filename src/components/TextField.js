import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({label,valuek,onChange,width}) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '500px' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label={label} variant="outlined" value={valuek} onChange={onChange} width={width}   />

        </Box>
    );
}