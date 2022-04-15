import {
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material'

const PreviewItemSkeleton = () => {
  return (
    <>
      <ListItemButton alignItems='flex-start'>
        <ListItemAvatar>
          <Skeleton />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton />}
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component='span'
              variant='body2'
              color='text.primary'
            >
              <Skeleton />
            </Typography>
          }
        />
      </ListItemButton>
      <Divider variant='inset' component='li' />
    </>
  )
}

const PreviewItemListSkeleton = () => {
  return (
    <>
      {['sk1', 'sk2', 'sk3', 'sk4', 'sk5', 'sk6', 'sk7'].map((item) => (
        <PreviewItemSkeleton key={item} />
      ))}
    </>
  )
}

export default PreviewItemListSkeleton
