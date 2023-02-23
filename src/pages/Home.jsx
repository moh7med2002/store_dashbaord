import { Box, Grid, Paper, Typography , styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DepartmentChart from '../components/chart/DepartmentChart'
import Layout from '../components/Layout'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LastTransications from '../components/LastOrders';
import { useSelector } from 'react-redux';

const IconWrapper = styled(Box)({
    height:"45px",
    width:"45px",
    borderRadius:"50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
})

export default function Home() {

    const {token} = useSelector((state)=>state.admin);
    const [data , setData] = useState({users:0 , orders:0 , products:0});

    useEffect(()=>
    {
        async function getOrders()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/admin/count/information`,{
                    headers:{
                        "Authorization":token,
                    }
                })
                const resData = await response.json()
                setData({users:resData.users , products:resData.products , orders:resData.orders})
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getOrders()
    },[])

    return (
        <Layout>
            <Typography sx={{fontSize:"28px",fontWeight:"700",marginBottom:"20px" , marginTop:"20px"}}>Dashboard</Typography>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Paper sx={{display:"flex",alignItems:"center",padding:"16px 12px",columnGap:"8px"}}>
                            <IconWrapper sx={{backgroundColor:"#066ac91a"}}><PersonIcon sx={{color:"#066ac9"}}/></IconWrapper>
                            <Box>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>Total Users</Typography>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>{data.users}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper sx={{display:"flex",alignItems:"center",padding:"16px 12px",columnGap:"8px"}}>
                            <IconWrapper sx={{backgroundColor:"#0cbc871a"}}><LocalGroceryStoreIcon sx={{color:"#0cbc87"}}/></IconWrapper>
                            <Box>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>Total Orders</Typography>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>{data.orders}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper sx={{display:"flex",alignItems:"center",padding:"16px 12px",columnGap:"8px"}}>
                            <IconWrapper sx={{backgroundColor:"#d6293e1a"}}><ShoppingBasketIcon sx={{color:"#d6293e"}}/></IconWrapper>
                            <Box>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>Total Products</Typography>
                                <Typography sx={{fontSize:"14px",fontWeight:"600"}}>{data.products}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            <Grid container spacing={5} sx={{marginTop:'50px'}}>
                <Grid xs={12} md={4} item>
                    <Paper sx={{padding:"20px" ,marginBottom:"20px"}}>
                    <DepartmentChart/>
                    </Paper>
                </Grid>
                <Grid xs={12} md={8} item sx={{marginBottom:"20px"}}>
                    <LastTransications/>
                </Grid>
            </Grid>
        </Layout>
    )
}
