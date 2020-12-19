import React, { VFC } from 'react'

type Props = JSX.IntrinsicElements['a']

export const CloseIcon: VFC<Props> = (props) => (
  <a
    {...props}
    className="absolute top-0 right-0 mr-4 no-underline cursor-pointer select-none"
    data-testid="closeIcon"
  >
    x
  </a>
)
