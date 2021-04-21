import React from 'react'

const Input = React.forwardRef(({ onChange, value, ...restProps }, ref) => <input onChange={e => onChange(e.target.value)} value={value || ''} ref={ref} {...restProps} />)

export default Input
