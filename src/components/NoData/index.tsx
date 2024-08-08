const NoData = ({message}:{message:string}) => {
  return (
    <div className="bg-white rounded-3xl shadow-3xl p-5 flex justify-center my-10 dark:bg-dark-lightBackground dark:border dark:border-slate-800 m-auto">
		<div>
			<p>{message}</p>
		</div>
	</div>
  )
}

export default NoData