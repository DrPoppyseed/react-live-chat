import { FC } from 'react'

type SpaceProps = {
  spaces?: number
}

const Space: FC<SpaceProps> = ({ spaces = 1 }) => {
  return (
    <span>
      {Array.from(Array(spaces)).map((_, index) => (
        <span key={index}>&nbsp;</span>
      ))}
    </span>
  )
}

export default Space
