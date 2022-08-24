import {Skeleton,Container,Grid} from '@mui/material';

const SkeletonJsx = () =>{
    return (
        <>
        <Container>
        <Grid container spacing={5} className="pt-12" >
          <Grid item md={3} xs={6}>
          <Skeleton variant="rectangular" className='w-70 h-48' />
                  <Skeleton />
                  <Skeleton width="60%" />
          </Grid>
          <Grid item md={3} xs={6}>
          <Skeleton variant="rectangular" className='w-70 h-48' />
                  <Skeleton />
                  <Skeleton width="60%" />
          </Grid>
          <Grid item md={3} xs={6}>
          <Skeleton variant="rectangular" className='w-70 h-48' />
                  <Skeleton />
                  <Skeleton width="60%" />
          </Grid>
          <Grid item md={3} xs={6}>
          <Skeleton variant="rectangular" className='w-70 h-48' />
                  <Skeleton />
                  <Skeleton width="60%" />
          </Grid>
        </Grid>  
        <Grid container spacing={5} className="pt-10 pb-12" >
          <Grid item md={3} xs={6}>
          <Skeleton variant="rectangular" className='w-70 h-48' />
                  <Skeleton />
                  <Skeleton width="60%" />
          </Grid>
          <Grid item md={3} xs={6}>
          <Skeleton variant="rectangular" className='w-70 h-48' />
                  <Skeleton />
                  <Skeleton width="60%" />
          </Grid>
          <Grid item md={3} xs={6}>
          <Skeleton variant="rectangular" className='w-70 h-48' />
                  <Skeleton />
                  <Skeleton width="60%" />
          </Grid>
          <Grid item md={3} xs={6}>
          <Skeleton variant="rectangular" className='w-70 h-48' />
                  <Skeleton />
                  <Skeleton width="60%" />
          </Grid>
        </Grid>  
     </Container>
     </>
    )
}
export default SkeletonJsx