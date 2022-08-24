import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Box} from '@mui/material'
export default function CarouselComponent(){
    return (
        <Carousel autoPlay showThumbs={false} infiniteLoop={true} className="mt-12">
        <Box>
            <img alt="" src={require("../../assets/carousel1.png")} />
          
        </Box>
        <Box>
            <img alt="" src={require("../../assets/carousel2.png")} />

        </Box>
        
    </Carousel>
    )
}
