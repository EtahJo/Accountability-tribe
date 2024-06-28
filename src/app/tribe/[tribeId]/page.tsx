'use client';
import { useState, useEffect } from 'react';
import TribeDetailHeader from '@/components/Tribe/TribeDetailHeder/index';
import TribeDetailBody, {
  TribeDetailBodyProps,
} from '@/components/Tribe/TribeDetailBody/index';

interface TribeStateProps {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  tribeId: string;
  users: { username: string; image: string; id: string }[];
  tags: string[];
}
function TribeProfile({ params }: { params: { tribeId: string } }) {
  const { tribeId } = params;
  const [tribeInfo, setTribeInfo] = useState<TribeStateProps | null>(null);
  const [similarTribes, setSimilarTribes] =
    useState<TribeDetailBodyProps | null>(null);
  const [error, setError] = useState<{ error: { message: string } } | null>(
    null
  );
  useEffect(() => {
    const fetchTribe = async () => {
      try {
        const response = await fetch(`/tribe/api/${tribeId}`, {
          headers: {
            accept: 'application/json',
            method: 'GET',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tribe');
        }
        const data = await response.json();

        setTribeInfo(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchTribe();
    const fetchSimilarTribes = async () => {
      try {
        const response = await fetch(
          `/tribe/api?tags=${tribeInfo?.tags.join(',')}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch tribe');
        }
        const data = await response.json();
        console.log(data);
        setSimilarTribes(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchSimilarTribes();
  }, [tribeId]);
  if (error)
    return (
      <div>
        <p>{'Error:' + error}</p>
      </div>
    );
  if (!tribeInfo) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-y-10">
      <TribeDetailHeader
        profileImage={tribeInfo.profileImage}
        tribeName={tribeInfo.name}
        tribeUsers={tribeInfo.users.length}
        tribeDescription={tribeInfo.description}
        users={tribeInfo.users}
      />
      <TribeDetailBody tribeInfo={tribeInfo} />
    </div>
  );
}

export default TribeProfile;
