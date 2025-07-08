// Internal dependencies
import { Box, Grid } from '@mui/material'
import CourseCard from './components/CourseCard'
import CustomAppBar from '../../components/CustomAppbar'

function Home() {
  return (
    <Box>
      <CustomAppBar />

      {/* Grid Container */}
      <Box sx={{ p: 3 }}>
        <Grid 
          container 
          spacing={3} 
          justifyContent="center"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid 
              item 
              xs={12} sm={6} md={4} lg={3} 
              key={index}
            >
              <CourseCard />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Home
