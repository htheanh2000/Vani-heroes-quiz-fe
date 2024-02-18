import { ReactNode } from "react"

interface Props {
    children: ReactNode
    className?: string
  }
  
  const Error = (props: Props) => {
    const {className, children} = props
    if(!children) return null
    return (
         <div
          className={`${className} capitalize px-4 py-3 mt-3 outline outline-1 outline-red-200 
                rounded-sm bg-red-100 text-red-600 text-sm`}
        >
          <span>{children}</span>
        </div>
    )
  }


  export default Error