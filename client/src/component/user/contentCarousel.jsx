import React, { useState, useEffect } from "react";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import '../../css/contentCarousel.scss'
import Typography  from "@mui/material/Typography";
import { Link } from "react-router-dom";
import baseURL from "../../baseurl";
import axiosNormal from "../../api/url";

export default function ContentCarousel() {

  const formatter = new Intl.NumberFormat('vi-VI', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 3
  })

  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [width,setWidth] = useState();

  useEffect(() => {
    axiosNormal.get(`/v1/iphone`)
      .then((response) => {
        setData(response.data);
        response.data.sort(function (a, b) {
          return a.price - b.price;
        });
      });

    if(window.innerWidth >= 1024){
      setWidth(4)
    }else{
      setWidth(2)
    }

  }, []);

  const moveBehind = () => {

    value === (-100 * (data.length - width))
      ? setValue(0)
      : setValue(value - 100);
  };
  const moveAhead = () => {

    value === 0
      ? setValue(-100 * (data.length - width))
      : setValue(value + 100);
  };





  return (
      <Box className="BoxGlobal">

          {data.map((data, index) => (
              data.display === true
              ?(
              <Box 
                key={index}
                className="BoxChild bg-slate-50"
                style={{ transform: `translateX(${value}%)` }}
              >
               <Card sx={{ maxWidth: 280 }} className="hover:shadow-sm hover:shadow-stone-900	hover:scale-105 rounded-lg mb-5 ">
                  <Link to={`/product-detail/${data._id}`}>
                    <CardMedia
                      component="img"
                      image={baseURL+"/"+data.photo[0]}
                      alt=""
                    />
                    <CardContent className='text-center text-black'>
                      <Typography gutterBottom  component="div">    
                        {data.name}
                      </Typography>
                      <Typography className='font-semibold'>
                         {formatter.format(data.price)}
                      </Typography>
                    </CardContent>
                  </Link>
                    </Card>
              </Box>
            ):null))}
       <ArrowCircleLeftIcon id="moveBehind" onClick={moveAhead} />

 <ArrowCircleRightIcon id="moveAhead" onClick={moveBehind} />

      </Box>

  );
}
