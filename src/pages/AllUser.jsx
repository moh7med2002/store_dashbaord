import React , {useEffect,useState} from 'react'
import Layout from '../components/Layout'
import {useSelector} from 'react-redux'
import {Box, Typography,Paper,Table,TableBody,TableRow,TableHead,TableContainer,styled} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

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

export default function Users() {
    const {token} = useSelector((state)=>state.admin)
    const [users,setUsers] = useState([])
    const [load,setLoad] = useState(true)
    
    useEffect(()=>
    {
        async function getUsers()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/admin/users/all`,{
                    headers:{
                        "Authorization":token,
                    }
                })
                const data = await response.json()
                setUsers(data.users)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getUsers()
    },[])


    return (
        <Layout>
            {!load?
            <Box sx={{maxWidth:"100%",marginTop:"30px",marginBottom:"40px"}}>
                <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"15px"}}>Users</Typography>
                <TableContainer component={Paper} sx={{overflowX:"auto"}}>
                    <Table aria-label="customized table" sx={{minWidth:"800px"}}>
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.length>0&&users.map((row,idnex) => (
                            <StyledTableRow key={idnex+'pq'}>
                            <StyledTableCell component="th" scope="row">
                                {row._id}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.email}
                            </StyledTableCell>
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
