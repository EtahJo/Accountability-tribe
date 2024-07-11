import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';
import { Tribe, TribeUser } from '@prisma/client';
type TribeProps = Pick<
  Tribe,
  'name' | 'description' | 'id' | 'profileImage'
> & { users: TribeUser[] };
interface RecommendedTribesProps {
  recommendedTribes: TribeProps[];
  userId: string;
}

const RecommendedTribesCarousel = ({
  recommendedTribes,
  userId,
}: RecommendedTribesProps) => {
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
            ({ id, name, description, profileImage, users }) => (
              <CarouselItem key={id} className="lg:basis-1/3 md:1/2">
                <TribeSnippet
                  key={id}
                  name={name}
                  desc={description}
                  tribeId={id}
                  userId={'9999'}
                  isMember={users.some((user) => user.userId === userId)}
                  members={users.length}
                  image={profileImage}
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
