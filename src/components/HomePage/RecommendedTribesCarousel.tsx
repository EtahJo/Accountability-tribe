'use client';
import useSWR from 'swr';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TribeSkeleton from '@/components/Skeletons/TribeSkeleton';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';

interface RecommendedTribesProps {
  userId: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const RecommendedTribesCarousel = ({ userId }: RecommendedTribesProps) => {
  const { data: recommendedTribes, isLoading } = useSWR(
    `https://accountability-tribe.vercel.app/tribe/api/recommended-tribes/${userId}`,
    fetcher
  );
  if (isLoading || recommendedTribes === undefined) {
    return (
      <div className="flex items-center gap-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <TribeSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-9">
      <Carousel
        opts={{
          align: 'center',
        }}
        className="w-full "
      >
        <CarouselContent className="w-full">
          {recommendedTribes?.map(
            ({
              id,
              name,
              description,
              profileImage,
              users,
              tribeVisit,
              newPosts,
            }: any) => (
              <CarouselItem key={id} className="lg:basis-1/3 md:1/2">
                <TribeSnippet
                  key={id}
                  name={name}
                  desc={description}
                  tribeId={id}
                  userId={userId}
                  isMember={users.some((user: any) => user.userId === userId)}
                  members={users.length}
                  image={profileImage}
                  lastVisit={tribeVisit[0]?.lastVisit as any}
                  newPosts={newPosts}
                />
              </CarouselItem>
            )
          )}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RecommendedTribesCarousel;
