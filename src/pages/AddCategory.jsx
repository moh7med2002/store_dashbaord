import { Box,Paper,Typography,Button,TextField, styled, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import ImageIcon from '@mui/icons-material/Image';
import {useSnackbar} from 'notistack'
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';


const Image = styled('img')({
    width:"100%",
    height:"300px",
    marginTop:"14px",
    borderRadius:"8px"
})

export default function AddCategory() {
    const title = useRef();
    const [loading , setLoading] = useState(false);
    const [isFetch , setIsFetch] = useState(false);
    const {closeSnackbar,enqueueSnackbar} = useSnackbar()
    const {token} = useSelector((state)=>state.admin)
    const [departments, setDepartments] = React.useState([]);
    const [depId , setDepId] = useState('');

    const handleChange = (event) => {
        setDepId(event.target.value);
    };



    useEffect(()=>{
        async function getDepartments () {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/admin/department`,{
                    method:"Get",
                    headers:{
                        'Authorization':token,
                    },
                })
                const data = await response.json()
                if(response.status!==200&&response.status!==201)
                {
                    throw new Error('failed occured')
                }
                setIsFetch(true);
                setDepartments(data.departments)
            }
            catch(err)
            {
                console.log(err);
            }
        };
        getDepartments();
    },[token]);


    async function createDepartmentHandler()
    {
        closeSnackbar()
        if(!title.current.value || !depId){
            enqueueSnackbar("Title and Department are required",{variant:"error",autoHideDuration:2500});
            return;
        }
        setLoading(true);
        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/admin/category/create`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                    'Authorization':token,
                },
                body : JSON.stringify({title:title.current.value.toLowerCase(), departmentId:depId})
            })
            const data = await response.json()
            if(response.status!==200&&response.status!==201)
            {
                enqueueSnackbar(data.message,{variant:"error",autoHideDuration:2500});
                setLoading(false);
                throw new Error('failed occured')
            }
            title.current.value="";
            setDepId("");
            setLoading(false);
            enqueueSnackbar(data.message,{variant:"success",autoHideDuration:2500})
        }
        catch(err)
        {
            setLoading(false);
            console.log(err);
        }
    }

    return (
        <Layout>
            {
                !isFetch 
                ?
                <Loading/>
                :
                <Box sx={{maxWidth:"100%",width:{md:"550px"},marginTop:"30px",marginBottom:"40px"}}>
                    <Typography sx={{fontSize:"24px",fontWeight:"600",marginBottom:"10px"}}>Add Category</Typography>
                    <Paper sx={{padding:"16px 12px"}}>
                        <TextField label="Title" fullWidth type="text" sx={{marginBottom:"20px"}} 
                        inputRef={title}/>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={depId}
                                label="Department"
                                onChange={handleChange}
                            >
                                {
                                    departments.map(d=>{
                                        return <MenuItem value={d._id} key={d._id+"edk"}>{d.title}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        {
                            loading
                            ?
                            <Button variant="contained" sx={{width:"100%",marginTop:"16px" , opacity:"0.7"}}>loading....</Button>
                            :
                            <Button variant="contained" onClick={createDepartmentHandler} sx={{width:"100%",marginTop:"16px"}}>Add Category</Button>
                        }
                    </Paper>
                </Box>
            }
        </Layout>
    )
}
