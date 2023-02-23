import { Box, Grid, Typography ,styled } from '@mui/material'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FlexWrapper = styled("Grid")({
    display:"flex",
    alignItems:"start",
    columnGap:"12px"
})

const IconWrapper = styled("Box")({
    color:"#ff5252",
    backgroundColor:"#ff52521a",
    width:"45px",
    height:"45px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:"50%"
})

export default function OrderDetails({order}) {
    return (
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={4}>
                    <FlexWrapper>
                        <IconWrapper><PersonIcon/></IconWrapper>
                        <Box>
                            <Typography sx={{fontSize:"15px",fontWeight:"600"}}>Customer</Typography>
                            <Typography sx={{fontSize:"14px"}}>{order.userId.name}</Typography>
                            <Typography sx={{fontSize:"14px"}}>{order.userId.email}</Typography>
                        </Box>
                    </FlexWrapper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FlexWrapper>
                        <IconWrapper><AirportShuttleIcon/></IconWrapper>
                        <Box>
                            <Typography sx={{fontSize:"15px",fontWeight:"600"}}>Order Info</Typography>
                            <Typography sx={{fontSize:"14px"}}>Postal Code : {order.postalCode}</Typography>
                            <Typography sx={{fontSize:"14px"}}>Total Price : ${order.totalPrice}</Typography>
                        </Box>
                    </FlexWrapper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FlexWrapper>
                        <IconWrapper><LocationOnIcon/></IconWrapper>
                        <Box>
                            <Typography sx={{fontSize:"15px",fontWeight:"600"}}>Deleiver to</Typography>
                            <Typography sx={{fontSize:"14px"}}>{order.address}</Typography>
                            <Typography sx={{fontSize:"14px"}}>{order.city}</Typography>
                            <Typography sx={{fontSize:"14px"}}>{order.country}</Typography>
                        </Box>
                    </FlexWrapper>
                </Grid>
            </Grid>
    )
}
