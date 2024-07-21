import React, { useEffect, useState } from 'react';
import { Container, Paper } from '@mui/material';
import AppBar from "../../components/AppBar";
import TextField from "../../components/TextField";
import BasicButtons from "../../components/Button";
import SelectVariants from "../../components/Select";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Swal from 'sweetalert2';

function Home() {
    const paperStyle = {
        padding: "50px 20px",
        margin: "20px auto",
        width: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };
    const buttonStyle = {
        padding: "10px 70px",
        marginBottom: "10px"

    };
    const ipAddress ='http://localhost:8081';
    const [courses, setCourses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [batchTypes, setBatchTypes] = useState([]);
    const [selectedBatchTypeId, setSelectedBatchTypeId] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedBatchId, setSelectedBatchId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');

    const handleCourseChange = (event) => {
        setSelectedCourseId(event.target.value);
    };
    const handleBatchChange = (event) => {
        setSelectedBatchId(event.target.value);
    };
    const handleBatchTypeChange = (event) => {
        setSelectedBatchTypeId(event.target.value);
    };

    const getCourseList = async () => {
        try {
            const response = await axios.get(`${ipAddress}/status/course-list`);
            setCourses(response.data.data);
        } catch (error) {
            console.error("There was an error fetching the course list!", error);
        }
    };

    useEffect(() => {
        getCourseList();
    }, []);

    const getBatchList = async () => {
        try {
            const response = await axios.get(`${ipAddress}/status/batches-by-course/${selectedCourseId}`);
            setBatches(response.data.data);
        } catch (error) {
            console.error("There was an error fetching the batch list!", error);
        }
    };

    useEffect(() => {
        if (selectedCourseId) {
            getBatchList();
        }
    }, [selectedCourseId]);

    const getBatchTypeList = async () => {
        try {
            const response = await axios.get(`${ipAddress}/status/batch-types-by-batch/${selectedBatchId}`);
            setBatchTypes(response.data.data);
        } catch (error) {
            console.error("There was an error fetching the batch types list!", error);
        }
    };

    useEffect(() => {
        if (selectedBatchId) {
            getBatchTypeList();
        }
    }, [selectedBatchId]);

    const handleSave = async () => {

        const studentData = {
            student_id: studentId,
            course_id: selectedCourseId,
            batch_id: selectedBatchId,
            batch_type_id: selectedBatchTypeId
        };


        try {
            const response = await axios.post(`${ipAddress}/status/insert/student`, studentData);
            if(response.data.code === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Student data has been successfully inserted!',
                });
            }
        } catch (error) {
            console.error("There was an error saving the student data!", error);
        }
    };
    console.log(studentId);

    return (
        <div>
            <AppBar />
            <br />
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1 style={{color: "#1976D2"}}>Add Graduated student</h1>
                    {/*<TextField label={'Name'} value={name} onChange={(e) => setName(e.target.value)} />*/}
                    {/*<TextField label={'Address'} value={email} onChange={(e) => setEmail(e.target.value)} />*/}
                    <TextField label={'Student Number'} value={studentId} onChange={(e) => setStudentId(e.target.value)}/>
                    <SelectVariants
                        label="Course"
                        courseId={selectedCourseId}
                        courses={courses}
                        handleChange={handleCourseChange}
                    />

                    <FormControl variant="standard" sx={{m: 1, minWidth: 500}}>
                        <InputLabel id="demo-simple-select-standard-label">Batch</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={selectedBatchId}
                            onChange={handleBatchChange}
                            autoWidth
                            label="Batch"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {batches.map(batch => (
                                <MenuItem key={batch.batch_id} value={batch.batch_id}>{batch.batch_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" sx={{m: 1, minWidth: 500}}>
                        <InputLabel id="demo-simple-select-standard-label">Batch Types</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={selectedBatchTypeId}
                            onChange={handleBatchTypeChange}
                            autoWidth
                            label="Batch Types"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {batchTypes.map(batchType => (
                                <MenuItem key={batchType.id} value={batchType.id}>{batchType.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>



                    <BasicButtons text={'Save'} style={buttonStyle} onClick={handleSave}/>

                </Paper>
            </Container>
        </div>
    );
}

export default Home;
