import React , {useEffect,useState} from 'react'
import Layout from '../components/Layout'
import {useSelector} from 'react-redux'
import {Box, Typography,Paper,Table,TableBody,TableRow,TableHead,TableContainer,styled, Button, Dialog, DialogContent, DialogActions} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Tooltip from '@mui/material/Tooltip';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        border: 0,
        },
}));

export default function Products() {
    const {token} = useSelector((state)=>state.admin)
    const [products,setProducts] = useState([])
    const [load,setLoad] = useState(true)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get("categoryId");
    
    useEffect(()=>
    {
        async function getProducts()
        {
            let response ; 
            try{
                if(paramValue)
                {
                    response = await fetch(`${process.env.REACT_APP_API}api/admin/product/all?categoryId=${paramValue}`,{
                        headers:{
                            "Authorization":token,
                        }
                    })
                }
                else{
                    response = await fetch(`${process.env.REACT_APP_API}api/admin/product/all`,{
                        headers:{
                            "Authorization":token,
                        }
                    })
                }
                const data = await response.json()
                setProducts(data.products)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getProducts()
    },[token , paramValue])


    const deleteProductHandler = async (id) => {
        setProducts(pre => pre.filter(p=>p._id!== id))
        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/admin/product/${id}`,{
                method:"DELETE",
                headers:{
                    "Authorization":token,
                }
            })
            const data = await response.json()
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const [openDelete , setOpenDelete] = useState(null);
    


    return (
        <Layout>
            {!load?
            <Box sx={{maxWidth:"100%",marginTop:"30px",marginBottom:"40px" , overflow:"auto"}}>
                <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"15px"}}>Products</Typography>
                <TableContainer component={Paper} sx={{minWidth:"800px"}}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.length>0&&products.map((row,idnex) => (
                            <StyledTableRow key={idnex+'pq'}>
                            <StyledTableCell component="th" scope="row">
                                {row.title}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.price}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.categoryId.title}
                            </StyledTableCell>
                            <StyledTableCell>
                                <Tooltip title="View">
                                    <Link to={`/products/${row._id}`}><Button color='success'><VisibilityIcon/></Button></Link>
                                </Tooltip>
                                <Tooltip title="Delete"><Button color='error' onClick={()=>setOpenDelete(row._id)}><DeleteIcon/></Button></Tooltip>
                                <Tooltip title="Edit">
                                    <Link to={`/product/update/${row._id}`}>
                                    <Button color='warning'><ModeEditIcon/></Button>
                                    </Link>
                                </Tooltip>
                            </StyledTableCell>
                            <Dialog
                            open={openDelete === row._id}
                            onClose={()=>setOpenDelete(null)}
                            >
                                <DialogContent>
                                    <Typography>Are sure ? want to delete this product</Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant='contained' onClick={()=>{deleteProductHandler(row._id); setOpenDelete(null)}}>Yes</Button>
                                    <Button onClick={()=>setOpenDelete(null)}>No</Button>
                                </DialogActions>
                            </Dialog>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            :
            <Loading/>}
        </Layout>
    )
}
