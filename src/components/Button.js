import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({text,style,onClick}) {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="contained" style={style} onClick={onClick}>{text}  </Button>
        </Stack>
    );
}