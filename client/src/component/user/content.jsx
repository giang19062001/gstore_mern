import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Container,Box, Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import usePagination from "./pagination";
import '../../css/home.css'
import { Link } from "react-router-dom";
import Search from './search'; 
import ContentCarousel from './contentCarousel';
import axiosNormal from "../../api/url";
import baseURL from '../../baseurl';
import SkeletonJsx from './skeleton';

export default function Content() {

  const formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 3
  })

  const [search, setSearch] = useState("");
  const [data,setData] = useState([]);
  let [page, setPage] = useState(1);
  const [showGoTop,setGoTop] = useState(false)
  const [skeleton,setSkeleton] = useState(true)

  useEffect(() => {
    if(search === ""){
      axiosNormal.get(`/v1/iphone`)
      .then((response) => {
        setData(response.data.filter(item => item.display !== false));
      });
    }else {
      axiosNormal.get(`/v1/iphone/search/${search}`)
      .then((response) => {
        setData(response.data.filter(item => item.display !== false));
      });
    }
  }, [search]);
    const PER_PAGE = 8;
    const count = Math.ceil(data.length / PER_PAGE);
    const _DATA = usePagination(data, PER_PAGE);
  
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };
  

    useEffect(() =>{
      const handleScoll = () =>{
          if(window.scrollY>=1050){
            setGoTop(true)
          }else{
            setGoTop(false)
          }
      }
      window.addEventListener("scroll",handleScoll);

      return () =>{ // clean funtion
        window.removeEventListener("scroll",handleScoll);
      }
    },[])
    
    const handleScollOnTop = () =>{
      window.scrollTo({ top: 0, behavior: 'smooth' })    }
 
      useEffect(()=>{
        setTimeout(()=>{
          setSkeleton(false)
        },1000)
      },[])
    
  return (
    <Box className='bg-slate-100'>
       {skeleton === true ?
      (
       <SkeletonJsx></SkeletonJsx>
       )
       :(
        <>
     <Container className='py-12'>
     <ContentCarousel></ContentCarousel>
     <Search onClick={(value) => setSearch(value)} />
    <Grid container spacing={5}>
      {data.length === 0 ? (
         <Grid item xs={12} md={12}>
            <Typography textAlign={"center"}>Không tìm thấy bất kì sản phẩm nào có tên : <b style={{color:"red"}}>"{search}"</b> </Typography>
        </Grid>
        ) : null }
        {_DATA.currentData().map((dataIphone,index) =>(
        <Grid item xs={6} md={3} key={index} >
        <Card sx={{ maxWidth: 345 }} className="hover:shadow-sm hover:shadow-yellow-500	hover:scale-105 bg-zinc-800 rounded-lg ">
      <Link to={`/product-detail/${dataIphone._id}`}>
        <CardMedia
          component="img"
          image={baseURL+"/"+dataIphone.photo[0]}
          alt="green iguana"
        />
        <CardContent className='text-center text-slate-50'>
          <Typography gutterBottom  component="div">    
            {dataIphone.name}
          </Typography>
          <Typography className='font-semibold'>
           {formatter.format(dataIphone.price)}
          </Typography>
        </CardContent>
      </Link>
         </Card>
        </Grid>
        ))} 
      </Grid>
      </Container>
      <Stack className="flex justify-center items-center py-12">
      <Pagination
         count={count}
        size="large"
        page={page}
        variant="outlined"
        color="primary"    
        onChange={handleChange}
      />
      </Stack>
      {showGoTop &&(
              <Button 
              className='fixed bottom-10 right-10 bg-sky-500 text-slate-50 rounded-full z-10 '
              onClick={handleScollOnTop}
              >
                Go to top 
              </Button>
            )}
          </>)}
    </Box>
  );
}
