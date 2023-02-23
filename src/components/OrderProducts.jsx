import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled, Typography,Box} from '@mui/material'

const Image = styled("img")({
    width:"45px",
    height:"45px"
})

export default function OrderProducts({products}) {
    return (
        <Box sx={{overflow:"auto"}}>
            <TableContainer component={Paper} sx={{overflow:"auto"}}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Color</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {products.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" sx={{display:"flex",alignItems:"center",columnGap:"12px"}}>
                        <Image src={`${process.env.REACT_APP_API}images/${row.image}`}/> {row.title}
                    </TableCell>
                    <TableCell align="right">{row.color}</TableCell>
                    <TableCell align="right">{row.size}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.qty}</TableCell>
                    <TableCell align="right">{row.price * row.qty}</TableCell>
                    </TableRow>
                ))}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell colSpan={6} align="right">
                        <Typography sx={{fontSize:"14px",marginBottom:"3px"}}>
                            Sub Total : ${products.reduce((acc,value)=>{return acc+value.price*value.qty},0)}
                        </Typography>
                        <Typography sx={{fontSize:"14px",marginBottom:"3px"}}>
                            Tax : $5
                        </Typography>
                        <Typography sx={{fontSize:"14px",marginBottom:"3px"}}>
                            Total Price : ${products.reduce((acc,value)=>{return acc+value.price*value.qty},0)+5}
                        </Typography>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
);
}
