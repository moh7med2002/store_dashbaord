import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import {Box, Paper, TextField, Typography, FormControlLabel,Chip, Checkbox, FormLabel,styled, Button,InputLabel,FormControl
    ,Select,OutlinedInput,MenuItem} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Input = styled("input")({})
const Image = styled('img')({
    width:"100%",
    marginTop:"14px",
})

export default function AddProduct() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [categories , setCategories] = useState([]);
    const {token} = useSelector((state)=>state.admin)
    const [isFetch , setIsFetch] = useState(false);
    const [categId , setCategId] =useState('');
    const [isLoading , setIsLoading] = useState(false);
    const titleRef = useRef();
    const priceRef = useRef();
    const [price , setPrice] = useState(0); 
    const [sizes, setSizes] = React.useState([]);
    const [image , setImage] = useState(null);
    const navigate = useNavigate();
    

    const handleSizeChange = (value) => {
        const currentIndex = sizes.indexOf(value);
        const newChecked = [...sizes];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        setSizes(newChecked);
      };

    function getStyles(name, personName, theme) {
            return {
            fontWeight:
                personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
            };
        }
    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(()=>{
        async function getCategories () {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/admin/category`,{
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
    },[token]);


    async function createProductHandler(){
        const formData = new FormData();
        formData.append('image' , image);
        formData.append('title' , titleRef.current.value);
        formData.append('colors' , personName);
        formData.append('sizes' , sizes);
        formData.append('categoryId' , categId);
        formData.append('price' , priceRef.current.value)
        setIsLoading(true)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/admin/product/create`,{
                method:"POST",
                headers:{
                    'Authorization':token,
                },
                body : formData
            })
            const data = await response.json()
            if(response.status!==200&&response.status!==201)
            {
                setIsLoading(false);
                throw new Error('failed occured')
            }
            setIsLoading(false);
            navigate('/products');
            }
        catch(err)
        {
            setIsLoading(false);
            console.log(err);
        }
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const names = [
    'red',
    'blue',
    'green',
    'yellow',
    'black',
    'white',
    'brown',
    'gray',
    'pink',
    'orange'
    ];



    return (
        <Layout>
            {
                !isFetch
                ?
                <Loading/>
                :
                <Box sx={{maxWidth:"100%",width:{md:"550px"},marginTop:"30px"}}>
                <Typography sx={{fontSize:"24px",fontWeight:"600",marginBottom:"10px"}}>Add Product</Typography>
                <Paper sx={{padding:"16px 12px"}}>
                    <TextField  label="Title" fullWidth type="text" sx={{marginBottom:"20px"}}
                    inputRef={titleRef}
                    />
                    <TextField label="Price" fullWidth type="number" sx={{marginBottom:"20px"}}
                    inputProps={{min:"0"}} inputRef={priceRef}
                    />
                    <FormControl fullWidth sx={{marginBottom:"14px"}}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple--label"
                                id="demo-simple-"
                                value={categId}
                                label="Category"
                                onChange={(e)=>setCategId(e.target.value)}
                            >
                                {
                                    categories.map(c=>{
                                        return <MenuItem value={c._id} key={c._id+"edksw"}>{c.title} ({c.departmentId.title})</MenuItem>
                                    })
                                }
                            </Select>
                    </FormControl>
                    <FormControl sx={{marginBottom:"14px"}} fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Color</InputLabel>
                        <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                        {names.map((name) => (
                        <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}>
                            {name}
                        </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <Box sx={{display:'flex',flexDirection:"column",marginBottom:"15px"}}>
                        <FormLabel>Size : </FormLabel>
                        <Box>
                            <FormControlLabel control={<Checkbox onChange={()=>handleSizeChange("xl")} checked={sizes.indexOf("xl") !== -1}/>} label="XL" />
                            <FormControlLabel control={<Checkbox onChange={()=>handleSizeChange("l")} checked={sizes.indexOf("l") !== -1}/>} label="L" />
                            <FormControlLabel control={<Checkbox onChange={()=>handleSizeChange("m")} checked={sizes.indexOf("m") !== -1}/>} label="M" />
                            <FormControlLabel control={<Checkbox onChange={()=>handleSizeChange("s")} checked={sizes.indexOf("s") !== -1}/>} label="S" />
                        </Box>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column",columnGap:"8px",marginBottom:"24px"}}>
                        <FormLabel sx={{marginBottom:"4px"}}>Image : </FormLabel>
                        <Input type="file" sx={{width:"100%",border:"1px solid #dde0e3",padding:"8px 5px"}} onChange={e=>setImage(e.target.files[0])}/>
                    </Box>
                    {image&&
                    <Box sx={{height:"300px" , overflowY:"auto"}}>
                        <Image src={URL.createObjectURL(image)}/>
                    </Box>
                    }
                    {
                        isLoading
                        ?
                        <Button variant="contained" sx={{width:"100%" , opacity:"0.7"}}>Add...</Button>
                        :
                        <Button variant="contained" sx={{width:"100%"}} onClick={createProductHandler}>Add Product</Button>
                    }
                </Paper>
            </Box>
            }
        </Layout>
    )
}
