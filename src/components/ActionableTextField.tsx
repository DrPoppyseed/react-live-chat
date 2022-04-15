import { IconButton, InputBase, Paper, styled } from '@mui/material'
import { FC, FormEvent, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type ActionableTextFieldProps = {
  register: UseFormRegisterReturn
  placeholder?: string
  adornment: ReactNode
  onSubmit: ((event: FormEvent<any>) => void) | undefined
}

const ActionableTextField: FC<ActionableTextFieldProps> = ({
  register,
  placeholder = '',
  onSubmit,
  adornment,
}) => {
  return (
    <TextFieldBase variant='outlined' component='form' onSubmit={onSubmit}>
      <InputBase {...register} fullWidth placeholder={placeholder} autoFocus />
      <IconButton type='submit' value='submit'>
        {adornment}
      </IconButton>
    </TextFieldBase>
  )
}

const TextFieldBase = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderRadius: theme.spacing(2),
  paddingLeft: theme.spacing(1),
})) as typeof Paper

export default ActionableTextField
