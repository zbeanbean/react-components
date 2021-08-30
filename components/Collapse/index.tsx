import React, { useEffect } from 'react'

const Collapse = (props: {
    show: boolean, 
    header: string | React.ReactNode, 
    children: any,
    onChange: (show: boolean) => void
  }) => {
    useEffect(() => {
      props.onChange(props.show)
    }, [props.show])
  
    return (
      <div>
        {props.header}
         {props.show ? props.children : null}
      </div>
    )
}

export default Collapse