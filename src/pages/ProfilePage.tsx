import MuiIntlMessage from '@/components/MuiIntlMessage'
import GoBackHeader from '@/components/PageHeader'
import { Box } from '@mui/material'

const Profile = () => (
  <Box>
    <GoBackHeader>
      <MuiIntlMessage id='profile_page.header' />
    </GoBackHeader>
  </Box>
)

export default Profile
