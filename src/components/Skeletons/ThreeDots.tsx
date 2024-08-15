import { Skeleton } from "../ui/skeleton"

const ThreeDots = () => {
  return (
    <div className="flex items-center gap-1">
        {
            Array.from({length:3}).map((_,index)=>(
                <Skeleton className="w-2 h-2 rounded-full" key={index}/>
            ))
        }
    </div>
  )
}

export default ThreeDots