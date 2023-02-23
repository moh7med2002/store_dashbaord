import { Box,Paper,Typography,Button,TextField, styled} from '@mui/material'
import React, { useRef } from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import ImageIcon from '@mui/icons-material/Image';
import {useSnackbar} from 'notistack'
import { useSelector } from 'react-redux';


const Image = styled('img')({
    width:"100%",
    height:"300px",
    marginTop:"14px",
    borderRadius:"8px"
})

export default function AddDepartment() {
    const title = useRef();
    const [image,setImage] = useState(null);
    const [loading , setLoading] = useState(false);
    const {closeSnackbar,enqueueSnackbar} = useSnackbar()
    const {token} = useSelector((state)=>state.admin)



    async function createDepartmentHandler()
    {
        closeSnackbar()
        if(!title || !image){
            enqueueSnackbar("Title and Image are required",{variant:"error",autoHideDuration:2500});
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('image' , image);
        formData.append('title' , title.toLowerCase());
        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/admin/department/create`,{
                method:"POST",
                headers:{
                    'Authorization':token,
                },
                body : formData
            })
            const data = await response.json()
            if(response.status!==200&&response.status!==201)
            {
                enqueueSnackbar(data.message,{variant:"error",autoHideDuration:2500});
                setLoading(false);
                throw new Error('failed occured')
            }
            title.current.value=""
            setImage(null);
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
            <Box sx={{maxWidth:"100%",width:{md:"550px"},marginTop:"30px",marginBottom:"40px"}}>
                <Typography sx={{fontSize:"24px",fontWeight:"600",marginBottom:"10px"}}>Add Department</Typography>
                <Paper sx={{padding:"16px 12px"}}>
                    <TextField label="Title" fullWidth type="text" sx={{marginBottom:"20px"}} 
                    inputRef={title}/>
                    <input type="file" id='image' hidden onChange={(e)=>setImage(e.target.files[0])}/>
                    <label htmlFor='image'>
                        <Box sx={{backgroundColor:"#ff5252",width:"45px",height:"45px",borderRadius:"50%",display:"flex",
                        justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
                            <ImageIcon sx={{color:"white"}}/>
                        </Box>
                    </label>
                    {image&&
                    <Box sx={{height:"300px" , overflowY:"auto"}}>
                        <Image src={URL.createObjectURL(image)}/>
                    </Box>
                    }
                    {
                        loading
                        ?
                        <Button variant="contained" sx={{width:"100%",marginTop:"16px" , opacity:"0.7"}}>loading....</Button>
                        :
                        <Button variant="contained" onClick={createDepartmentHandler} sx={{width:"100%",marginTop:"16px"}}>Add Department</Button>
                    }
                </Paper>
            </Box>
        </Layout>
    )
}
