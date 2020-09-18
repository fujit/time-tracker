import React from 'react'

type Props = JSX.IntrinsicElements['a']

export const CloseIcon: React.FC<Props> = (props) => (
  <a
    {...props}
    className="cursor-pointer no-underline select-none absolute top-0 right-0 mr-4"
    data-testid="closeIcon"
  >
    x
  </a>
)
