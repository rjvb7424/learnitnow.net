// Internal dependencies
import { Box } from '@mui/material'
import CourseCard from './components/Coursecard'
import CustomAppBar from './components/CustomAppbar'

function Home() {

  return (
    <Box>
      <CustomAppBar/>
      <CourseCard/>
    </Box>
  )
}

export default Home