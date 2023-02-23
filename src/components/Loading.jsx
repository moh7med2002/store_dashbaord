import { Box } from '@mui/material';
import React from 'react'
import ReactLoading from 'react-loading';


export default function Loading() {
  return (
    <Box sx={{display:"flex" , alignItems:"center" , justifyContent:"center" , height:"80vh"}}>
        <ReactLoading type={"spin"} color={"#ff5252"} height={100} width={100} />
    </Box>
  )
}
