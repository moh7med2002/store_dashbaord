import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {Box, Paper, TextField, Typography, FormControlLabel,Chip, Checkbox, FormLabel,styled, Button,InputLabel,FormControl
    ,Select,OutlinedInput,MenuItem} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
const Input = styled("input")({})
const Image = styled('img')({
    width:"100%",
    marginTop:"14px",
})

export default function UpdateProduct() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [categories , setCategories] = useState([]);
    const {token} = useSelector((state)=>state.admin)
    const [isFetch , setIsFetch] = useState(false);
    const [categId , setCategId] =useState('');
    const [isLoading , setIsLoading] = useState(false);
    const [title , setTitle] = useState(''); 
    const [price , setPrice] = useState(0); 
    const [sizes, setSizes] = React.useState([]);
    const [image , setImage] = useState(null);
    const navigate = useNavigate();
    const [product , setProduct] = useState({});
    const {productId} = useParams();
    

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
                setIsFetch(true);
                setTitle(data.product.title);
                setPersonName(data.product.colors);
                setSizes(data.product.sizes)
                setPrice(data.product.price)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getProduct()
    },[token , productId])

    async function updateProductHandler(){
        const formData = new FormData();
        formData.append('image' , image);
        formData.append('title' , title);
        formData.append('colors' , personName);
        formData.append('sizes' , sizes);
        formData.append('price' , price)
        setIsLoading(true)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/admin/product/${productId}`,{
                method:"PUT",
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
            navigate(`/products/${productId}`);
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
                <Typography sx={{fontSize:"24px",fontWeight:"600",marginBottom:"10px"}}>Update Product</Typography>
                <Paper sx={{padding:"16px 12px"}}>
                    <TextField label="Title" fullWidth type="text" sx={{marginBottom:"20px"}}
                    value={title} onChange={e=>setTitle(e.target.value)}
                    />
                    <TextField label="Price" fullWidth type="number" sx={{marginBottom:"20px"}}
                    value={price} onChange={e=>setPrice(e.target.value)} inputProps={{min:"0"}}
                    />
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
                    <Box sx={{height:"300px" , overflowY:"auto"}}>
                        <Image src={image? URL.createObjectURL(image) : `${process.env.REACT_APP_API}images/${product?.image}`}/>
                    </Box>
                    {
                        isLoading
                        ?
                        <Button variant="contained" sx={{width:"100%" , opacity:"0.7"}}>update...</Button>
                        :
                        <Button variant="contained" sx={{width:"100%"}} onClick={updateProductHandler}>Update</Button>
                    }
                </Paper>
            </Box>
            }
        </Layout>
    )
}
