import GotoButton from '@/components/GoTo/index'
interface NoDataProps{
	message:string;
	linkTo?:string;
	buttonTitle?:string;
}
const NoData = ({message,linkTo,buttonTitle}:NoDataProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-3xl p-5 flex justify-center my-10 dark:bg-dark-lightBackground 
	dark:border dark:border-slate-800 m-auto w-full">
		<div className='flex flex-col items-center gap-y-2'>
			<p>{message}</p>
			{
				linkTo && <GotoButton href={linkTo} title={buttonTitle as string}/>
			}
		</div>
	</div>
  )
}

export default NoData