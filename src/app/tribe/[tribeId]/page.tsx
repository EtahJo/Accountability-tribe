'use client';
import { useState, useEffect } from 'react';
import TribeDetailHeader from '@/components/Tribe/TribeDetailHeder/index';
import TribeDetailBody from '@/components/Tribe/TribeDetailBody/index';

interface TribeStateProps {
  name: string;
  profileImage: string;
  users: [];
  description: string;
}
function TribeProfile({ params }: { params: { tribeId: string } }) {
  const { tribeId } = params;
  const [tribeInfo, setTribeInfo] = useState<TribeStateProps | null>(null);
  const [error, setError] = useState<{ error: { message: string } } | null>(
    null
  );
  useEffect(() => {
    const fetchTribe = async () => {
      try {
        const response = await fetch(`/api/tribes/${tribeId}`, {
          headers: {
            accept: 'application/json',
            method: 'GET',
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch tribe');
        }
        const data = await response.json();
        console.log(data);
        setTribeInfo(data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchTribe();
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
      <TribeDetailBody />
    </div>
  );
}

export default TribeProfile;
