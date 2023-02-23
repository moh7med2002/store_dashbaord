import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout'
import {useSelector} from 'react-redux'
import {Box, Typography,Paper,Table,TableBody,TableRow,TableHead,TableContainer,styled, Button} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';


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

export default function Categories() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get("departmentId");
    const {token} = useSelector((state)=>state.admin);
    const [categories , setCategories] = useState([]);
    const [isFetch , setIsFetch] = useState(false);


    useEffect(()=>{
        async function getCategories () {
            try{
                const response = paramValue ?
                 await fetch(`${process.env.REACT_APP_API}api/admin/category?departmentId=${paramValue || null}`,{
                    method:"Get",
                    headers:{
                        'Authorization':token,
                    },
                })
                :
                await fetch(`${process.env.REACT_APP_API}api/admin/category`,{
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
                setCategories(data.categories);
            }
            catch(err)
            {
                console.log(err);
            }
        };
        getCategories();
    },[token , paramValue]);

  return (
    <Layout>
            {
                isFetch 
                ?
                <Box sx={{maxWidth:"100%",marginTop:"30px",marginBottom:"40px"}}>
                    <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"15px"}}>Categories</Typography>
                    <TableContainer component={Paper}>
                        <Table  aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Department</StyledTableCell>
                                <StyledTableCell>View Products</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {categories?.length>0&&categories.map((row,idnex) => (
                                <StyledTableRow key={idnex+'pq'}>
                                <StyledTableCell component="th" scope="row">
                                    {row.title}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.departmentId.title}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link to={`/products?categoryId=${row._id}`}>
                                        <Button><VisibilityIcon/></Button>
                                    </Link>
                                </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                :
                <Loading/>
            }
        </Layout>
  )
}
