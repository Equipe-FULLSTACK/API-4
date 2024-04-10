import React from 'react'

interface Props{
    className?: string;
    display?: string;
    flexDirection?: string;
    alignItems?: string;
    alignContent?: string;
    flexWrap?: string;
    maxWidth?: string;
    minWidth?:string;
    margin?: string;
}
export const PageItemWrapper:React.FC <Props> = ({className, children}) => {
    return (
       <div className={className}>{children}</div>
    )
}

