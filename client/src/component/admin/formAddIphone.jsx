import React from "react"
import { Box, Container, TextField,Button, Typography, Stack } from "@mui/material"
import axiosNormal from '../../api/url.js'
import { useNavigate } from 'react-router-dom';

const AddIphone = () => {

    const navigate = useNavigate()

    const [iphone,setIphone] = React.useState({
        name:"",
        price:0,
        description:"",
        photo:[]

    })

    const handleImage = (event) => {
        const files = event.target.files;
        const images = [];
        for(let file of files){
            images.push(file);
        }
        setIphone((preState) => ({
          ...preState,
          photo: images,
        }));
      };
    const handleChange = (event) =>{
        setIphone((preState) => ({
            ...preState,
            [event.target.name]: event.target.value,
          }));
    }
    const handleAdd = async () =>{
        try { 
            console.log(iphone)
            const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };
           await axiosNormal.post(`/v1/iphone`,iphone,config)
            .then(() => {
                navigate(0);
              });
        } catch (error) {
            throw error
        }
    }
    return (
        <Box>
            <Container>
                <Typography className="text-lg py-5"> Thêm sản phẩm mới</Typography>
                <Stack spacing={2}>
                    <TextField name="name" label="Tên sản phẩm" onChange={handleChange}></TextField>
                    <TextField name="price" label="Gía sản phẩm"  
                    onChange={(event) => setIphone((preState) => ({...preState,price:parseInt(event.target.value)}))}></TextField>
                    <TextField name="description" label="Mô tả" multiline rows={3}  onChange={handleChange}></TextField>
                    <Typography className="text-sm">(Chỉ upload tối đa 3 ảnh)</Typography>

                  <TextField type="file"
                    inputProps={{
                        multiple: true
                    }}
                    name="photo"
                    onChange={handleImage}
                    ></TextField>
                    <Button className="bg-green-600 hover:bg-green-700 text-slate-50 p-3 " onClick={handleAdd}>Thêm sản phẩm</Button>
                </Stack>
            
            </Container>
        </Box>
    )
}
export default AddIphone