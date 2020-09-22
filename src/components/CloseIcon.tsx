import React from 'react'

type Props = JSX.IntrinsicElements['a']

export const CloseIcon: React.FC<Props> = (props) => (
  <a
    {...props}
    className="absolute top-0 right-0 mr-4 no-underline cursor-pointer select-none"
    data-testid="closeIcon"
  >
    x
  </a>
)
