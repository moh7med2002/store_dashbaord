import React , {useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {Box, Typography,Paper,Table,TableBody,TableRow,TableHead,TableContainer} from '@mui/material'
import TableCell from '@mui/material/TableCell';
import Loading from '../components/Loading';
import moment from 'moment';

export default function LastTransications() {
    const {token} = useSelector((state)=>state.admin)
    const [orders,setOrders] = useState([])
    const [load,setLoad] = useState(true)
    
    useEffect(()=>
    {
        async function getOrders()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/admin/order/all?last=true`,{
                    headers:{
                        "Authorization":token,
                    }
                })
                const data = await response.json()
                setOrders(data.orders)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getOrders()
    },[])


    return (
        <Paper sx={{padding:"16px 10px",height:"100%" , marginBottom:"20px"}}>
            {!load?
            <Box>
                <Typography sx={{marginBottom:"8px",fontWeight:"500"}}>Latest transactions</Typography>
                <TableContainer>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders?.length>0&&orders.map((row,idnex) => (
                            <TableRow key={idnex+'pqo7'}>
                                <TableCell component="th" scope="row">
                                    {row.userId.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    ${row.totalPrice}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {moment(row.createdAt).format("MMM Do yyyy")}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Box sx={{color:"white",backgroundColor:row.isDelivey?"#0cbc87":"#24292d",width:"fit-content",padding:"3px 9px",borderRadius:"4px"}}>
                                        {row.isDelivey?"Delivered":"Not Delivered"}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            :
            <Loading/>}
        </Paper>
    )
}
