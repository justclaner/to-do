const Loading = () => {
    
  return (
    <div className="h-24 w-24 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
        <div className="animate-ping absolute h-full w-full rounded-full bg-amber-600"></div>
    </div>
  )
}

export default Loading