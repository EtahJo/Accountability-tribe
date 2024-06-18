'use client';

import { createContext, useState } from 'react';

interface ImageUploadProps {
  url: string | undefined;
  addUrl: (val: string) => void;
}
export const ImageUploaderContext = createContext<ImageUploadProps>({
  url: undefined,
  addUrl: (val: string) => {},
});
export default function ImageUploaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [url, setUrl] = useState<string>('');
  const addUrl = (theUrl: string) => {
    setUrl(theUrl);
  };
  return (
    <ImageUploaderContext.Provider value={{ url, addUrl }}>
      {children}
    </ImageUploaderContext.Provider>
  );
}
