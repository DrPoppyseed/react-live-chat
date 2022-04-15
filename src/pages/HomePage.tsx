import PreviewItem from '@/components/PreviewItem'
import PreviewItemListSkeleton from '@/components/PreviewItemListSkeleton'
import { firebaseApp, firestore } from '@/config/firebase'
import useGetUser from '@/hooks/useGetUser'
import { Box, Button, List, styled } from '@mui/material'
import { getAuth } from 'firebase/auth'
import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const RoomsPage = () => {
  const { currentUser: user } = useMemo(
    () => getAuth(firebaseApp),
    [firebaseApp]
  )
  const { previews, loading: dataLoading } = useGetUser(firestore, firebaseApp)

  const memoedPreviews = useMemo(
    () =>
      previews.map((preview) => (
        <PreviewItem {...preview} key={preview.message} />
      )),
    [previews]
  )

  return (
    <>
      <PageContainer isAuthenticated={!!user}>
        <Box>
          {user ? (
            <PreviewList>
              {dataLoading ? <PreviewItemListSkeleton /> : memoedPreviews}
            </PreviewList>
          ) : (
            <ButtonsContainer>
              <Button component={RouterLink} to='signin'>
                Sign In
              </Button>
              <Button>Sign Up</Button>
            </ButtonsContainer>
          )}
        </Box>
      </PageContainer>
    </>
  )
}

const PageContainer = styled(Box)<{ isAuthenticated: boolean }>(
  ({ isAuthenticated }) => ({
    height: '100%',
    display: isAuthenticated ? 'inherit' : 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  })
)

const PreviewList = styled(List)(() => ({
  width: '100%',
}))

const ButtonsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

export default RoomsPage
