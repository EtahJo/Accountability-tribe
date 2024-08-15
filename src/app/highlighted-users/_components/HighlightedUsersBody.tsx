"use client"
import useSWR from 'swr';
import Link from 'next/link';
import UserSkeleton from '@/components/Skeletons/UserSkeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ThreeDots from '@/components/Skeletons/ThreeDots';
import { highlightedUsersType } from '@/components/HomePage/HeroSection/HeroLoggedIn';


const fetcher = (url: string) => fetch(url).then((res) => res.json());
const HighlightedUsersBody = () => {
const { data: highlightedUsers, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/highlighted-users`,
		fetcher
	);
  return (
    <div className='mx-10 mt-12'>
 <Table className='bg-purple dark:bg-dark-primary 
    rounded-3xl shadow-3xl'>
      <TableCaption>A list of highlighted users</TableCaption>
      <TableHeader>
        <TableRow >
          <TableHead className='text-white font-bold'>
            Image
          </TableHead>
          <TableHead className='text-white font-bold'>Name</TableHead>
          <TableHead className='text-white font-bold'>Streak</TableHead>
          <TableHead className='text-white font-bold'>Tribes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          isLoading || highlightedUsers === undefined ?(
            <TableRow>
              <TableCell>
                <UserSkeleton classNames='bg-white w-4 h-4'/>
              </TableCell>
              <TableCell>
                <ThreeDots/>
              </TableCell>
               <TableCell>
                <ThreeDots/>
              </TableCell>
               <TableCell>
                <ThreeDots/>
              </TableCell>
            </TableRow>
          ):(
            highlightedUsers.map(({
              username,
              country,
              image,
              id,
              streak,
              tribes,
              accounts
            }:highlightedUsersType)=>(
              <TableRow key={id}>
                <TableCell>

                </TableCell>
                <TableCell>
                  {username}
                </TableCell>
                <TableCell>
                  {streak.count}
                </TableCell>
                <TableCell>
                  <Link href={`/user/${username}?page=1`}>
                    {tribes.length}
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )
        }
      </TableBody>
    </Table>
    </div>
   
  )
}

export default HighlightedUsersBody