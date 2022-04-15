import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { FC, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

type PasswordTextFieldProps = {
  register: UseFormRegisterReturn
  placeholder?: string
}

const PasswordTextField: FC<PasswordTextFieldProps> = ({
  register,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(true)

  return (
    <TextField
      {...register}
      type={showPassword ? 'password' : 'text'}
      label={<FormattedMessage id='auth_textfield.label.password' />}
      autoComplete='current-password'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='Toggle password visibility'
              onClick={() => setShowPassword(!showPassword)}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswordTextField
