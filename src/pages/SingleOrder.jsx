import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Box,Button, Grid, Paper } from '@mui/material'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import OrderDetails from '../components/OrderDetails'
import OrderProducts from '../components/OrderProducts'

export default function SingleOrder() {
    const navigate = useNavigate()
    const {orderId} = useParams()
    const [order,setOrder] = useState(null)
    const [load,setLoad] = useState(true)
    const [isDeliver,setIsDeliver] = useState(false)
    const {token} = useSelector((state)=>state.admin)

    useEffect(()=>
    {
        async function getOrder()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/admin/order/${orderId}`,{
                    headers:{
                        "Authorization":token,
                    }
                })
                const data = await response.json()
                setOrder(data.order)
                setIsDeliver(data.order.isDelivey)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getOrder()
    },[orderId])

    async function deliverOrder()
    {
        try{
            setIsDeliver(true)
            const response = await fetch(`${process.env.REACT_APP_API}api/admin/order/deliver/${orderId}`,{
                method:"PUT",
                headers:{
                    "Authorization":token
                }
            });
            const resData = await response.json();
            console.log(resData);
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Layout>
            <Box sx={{marginTop:"40px",marginBottom:"40px"}}>
                <Button variant='contained' color="Black" onClick={()=>navigate('/orders')} sx={{fontSize:"12px"}}>Back to orders</Button>
                {
                    !load?
                    <Paper sx={{padding:"30px 20px",marginTop:"30px"}}>
                        <OrderDetails order={order}/>
                        <Grid container spacing={3} sx={{marginTop:"25px"}}>
                            <Grid item xs={12} lg={10}>
                                <OrderProducts products={order.products}/>
                            </Grid>
                            <Grid item lg={2}>
                                {!isDeliver?
                                <Button variant='contained' color="Black" sx={{fontSize:"12px"}} fullWidth onClick={deliverOrder}>
                                    Mark as delivered
                                </Button>
                                :
                                <Button variant='contained' color="success" sx={{fontSize:"12px"}} fullWidth>
                                    delivered
                                </Button>}
                            </Grid>
                        </Grid>
                    </Paper>
                    :
                    <Loading/>
                }
            </Box>
        </Layout>
    )
}
