import Appbar from "../../component/user/appbar";
import Content from "../../component/user/content";
import Footer from "../../component/user/footer";
import CarouselComponent from "../../component/user/carousel";
import React  from 'react';

const HomePage = () => {
  return (
    <>     
     <Appbar></Appbar>
     <CarouselComponent></CarouselComponent>
     <Content></Content>
            <Footer></Footer>
    </>
  );
}

export default HomePage
