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
import CountryFlag from "@/components/CountryFlag/index";
import PaginationController from '@/components/PaginationController';
import { useSearchParams } from 'next/navigation';
import ThreeDots from '@/components/Skeletons/ThreeDots';
import { highlightedUsersType } from '@/components/HomePage/HeroSection/HighlightedUsers';
import ProfileImage from '@/components/ProfileImage';
import { Button } from '@/components/ui/button';


const fetcher = (url: string) => fetch(url).then((res) => res.json());
const HighlightedUsersBody = () => {
const searchParams = useSearchParams();
let page = parseInt(searchParams?.get("page") as string, 10);
page = !page || page < 1 ? 1 : page;
const { data: highlightedUsers, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/highlighted-users?page=${page}`,
		fetcher
	);
  return (
    <div className='mx-10 min-[639px]:mt-12 mt-24'>
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
            highlightedUsers?.users.map(({
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
                  <ProfileImage
                  image={image}
                  alt="highlighted user profile image"
                  dimensions='largePhone:w-[50px] largePhone:h-[50px] w-[30px] h-[30px]'
                  isOAuth={accounts.length>0}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/user/${username}`}>
                    <Button variant={'link'}>
                      {country && <CountryFlag countryCode={country}/>}
                       {username}
                    </Button>
                  </Link>  
                </TableCell>
                <TableCell>
                  {streak.count}
                </TableCell>
                <TableCell>
                  <Link href={`/user/${username}/tribes?page=1`}>
                    <Button className='move-button'>
                      {tribes.length}
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )
        }
      </TableBody>
    </Table>
    {
      !isLoading && highlightedUsers !== undefined &&
       <PaginationController
       hasMore={highlightedUsers.hasMore}
       page={page}
       totalPages={highlightedUsers.totalPages}

    />
    }
   
    </div>
   
  )
}

export default HighlightedUsersBody