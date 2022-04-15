import MuiIntlMessage from '@/components/MuiIntlMessage'
import BodyContainer from '@/layout/BodyContainer'
import { Box } from '@mui/material'
import PageHeader from '../components/PageHeader'

const SettingsPage = () => (
  <Box>
    <PageHeader>
      <MuiIntlMessage id='settings_page.header' />
    </PageHeader>
    <BodyContainer>Settings</BodyContainer>
  </Box>
)

export default SettingsPage
