import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {useParams} from 'react-router-dom'
import {Typography,Grid,styled, Box,Rating} from '@mui/material'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'

const Image = styled('img')({
    width:"100%",
    height:"600px"
})

export default function SingleProduct() {
    const {productId} = useParams();
    const [product , setProduct] = useState({});
    const [load , setLoad] = useState(true);
    const {token} = useSelector((state)=>state.admin)

    useEffect(()=>
    {
        async function getProduct()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/admin/product/${productId}`,{
                        headers:{
                            "Authorization":token,
                        }
                    })
                const data = await response.json()
                setProduct(data.product)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getProduct()
    },[token , productId])

    return (
        <Layout>
            {
                load
                ?
                <Loading/>
                :
                <Box sx={{marginTop:"40px"}}>
                <Grid container spacing={4}>
                    <Grid item lg={6} xl={5}>
                        <Image
                        src={`${process.env.REACT_APP_API}images/${product?.image}`}/>
                    </Grid>
                    <Grid item xs={12} lg={6} xl={7}>
                        <Typography sx={{fontSize:"24px",fontWeight:"600",marginBottom:"10px"}}>{product?.title}</Typography>
                        <Box sx={{display:"flex",alignItems:"center",columnGap:"6px"}}>
                            <Rating name="half-rating-read" defaultValue={product.rate} precision={0.5} readOnly sx={{fontSize:"20px"}}/>
                            <Typography sx={{color:"#747579",fontSize:"14px"}}>{product.reviews.length} reviews</Typography>
                        </Box>
                        <Typography color="error" sx={{fontSize:"20px",margin:"10px 0px"}}>{product?.price}$</Typography>
                        <Typography sx={{fontSize:"16px",margin:"10px 0px 6px",fontWeight:"400"}}>Colors</Typography>
                        <Box sx={{display:"flex",columnGap:"8px",padding:"0px 4px",flexWrap:"wrap",marginBottom:"20px"}}>
                            {
                                product?.colors.map((item,index)=>
                                {
                                    return <Box sx={{borderRadius:"5px",backgroundColor:"#dee2e6", width:"fit-content", padding:"5px",
                                    fontWeight:"600",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"14px"}} 
                                    key={index+'lb1'}>{item}</Box>
                                })
                            }
                        </Box>
                        <Typography sx={{fontSize:"16px",margin:"10px 0px 6px",fontWeight:"400"}}>Sizes</Typography>
                        <Box sx={{display:"flex",columnGap:"8px",padding:"0px 4px",flexWrap:"wrap",marginBottom:"20px"}}>
                            {
                                product?.sizes.map((item,index)=>
                                {
                                    return <Box sx={{width:"30px",height:"30px",borderRadius:"50%",backgroundColor:"#dee2e6",
                                            fontWeight:"600",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"14px"}} 
                                            key={index+'lb1'}>{item}</Box>
                                })
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            }
        </Layout>
    )
}