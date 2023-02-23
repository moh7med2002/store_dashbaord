import React , {useEffect,useState} from 'react'
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

export default function Departments() {
    const {token} = useSelector((state)=>state.admin)
    const [departments,setDepartments] = useState([]);
    const [isFetch , setIsFetch] = useState(false);
    
    useEffect(()=>
    {
        async function getDepartments()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/admin/department`,{
                    headers:{
                        "Authorization":token,
                    }
                })
                const data = await response.json();
                setDepartments(data.departments);
                setIsFetch(true);
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getDepartments()
    },[])


    return (
        <Layout>
            {
                isFetch 
                ?
                <Box sx={{maxWidth:"100%",marginTop:"30px",marginBottom:"40px"}}>
                    <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"15px"}}>Departments</Typography>
                    <TableContainer component={Paper}>
                        <Table  aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>View Categories</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {departments?.length>0&&departments.map((row,idnex) => (
                                <StyledTableRow key={idnex+'pq'}>
                                <StyledTableCell component="th" scope="row">
                                    {row.title}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Link to={`/categories?departmentId=${row._id}`}>
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