// Check the strength of a given password.
// Implementation below is a slight adjustment to the implementation in the
// following repository.
// https://github.com/deanilvincent/check-password-strength

import { AllowedSymbols } from '@/constants/AllowedSymbols'

export type DiversityType = 'lowercase' | 'uppercase' | 'symbol' | 'number'

type Option = {
  id: number
  value: string
  minDiversity: number
  minLength: number
}

type Rule = {
  regex: string
  message: DiversityType
}

type Strength = {
  id: number
  value: string
  contains: DiversityType[]
  length: number
}

const options: Option[] = [
  {
    id: 0,
    value: 'Too weak',
    minDiversity: 0,
    minLength: 0,
  },
  {
    id: 1,
    value: 'Weak',
    minDiversity: 2,
    minLength: 6,
  },
  {
    id: 2,
    value: 'Medium',
    minDiversity: 4,
    minLength: 8,
  },
  {
    id: 3,
    value: 'Strong',
    minDiversity: 4,
    minLength: 10,
  },
]

const rules: Rule[] = [
  {
    regex: '[a-z]',
    message: 'lowercase',
  },
  {
    regex: '[A-Z]',
    message: 'uppercase',
  },
  {
    regex: '[0-9]',
    message: 'number',
  },
  {
    regex: `[${AllowedSymbols}]`,
    message: 'symbol',
  },
]

export const passwordStrength = ({
  password,
}: {
  password: string
}): Partial<Strength> => {
  const passwordCopy = password

  const strength = {
    contains: rules
      .filter((rule) => new RegExp(`${rule.regex}`).test(passwordCopy))
      .map((rule) => rule.message),
    length: passwordCopy.length,
  }

  let fulfilledOptions = options
    .filter((option) => strength.contains.length >= option.minDiversity)
    .filter((option) => strength.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id)
    .map((option) => ({ id: option.id, value: option.value }))

  Object.assign(strength, fulfilledOptions[0])

  return strength
}
