import React from 'react'

interface Props{
    className?: string;
    display?: string;
    flexDirection?: string;
    justifyContent: string;
    alignItems?: string;
    alignContent?: string;
    flexWrap?: string;
    maxWidth?: string;
    minWidth?:string;
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
    backgroundColor?:string;
}
export const ItemWrapper:React.FC <Props> = ({className, children}) => {
    return (
       <div className={className}>{children}</div>
    )
}

