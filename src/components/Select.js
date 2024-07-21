import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants({courseId,courses,handleChange,label}) {


    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={courseId}
                    onChange={handleChange}
                    label={label}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {courses.map(course => (
                        <MenuItem key={course.course_id} value={course.course_id}>{course.course_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}