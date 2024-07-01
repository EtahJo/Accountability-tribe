'use Client';
import { useEffect, useState } from 'react';
import { withFormsy } from 'formsy-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import InputLabel, { InputLabelProps } from '../InputLabel/index';

interface CustomTagsInputProps {
  addTag: (tag: any) => void;
  handleRemoveFxn: (tag: any) => void;
}

const CustomTagsInput = ({
  lable,
  labelIcon,
  required,
  addTag,
  handleRemoveFxn,
}: CustomTagsInputProps & InputLabelProps) => {
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [availableTags, setAvailableTags] = useState([
    {
      id: 1,
      text: 'Study',
      selected: false,
    },
    {
      id: 2,
      text: 'Fitness',
      selected: false,
    },
    {
      id: 3,
      text: 'Spiritual',
      selected: false,
    },
    {
      id: 7,
      text: 'Dieting',
      selected: false,
    },
    {
      id: 4,
      text: 'Software development',
      selected: false,
    },

    {
      id: 5,
      text: 'Self Development',
      selected: false,
    },
    {
      id: 6,
      text: 'Book Club',
      selected: false,
    },
  ]);
  const handleRemove = (item: any) => {
    const newItems = new Set(selectedTags);
    newItems.delete(item);
    setSelectedTags(newItems);
  };

  return (
    <div className=" flex flex-col gap-y-2">
      {lable && (
        <InputLabel lable={lable} labelIcon={labelIcon} required={required} />
      )}
      <div className=" gap-2 border-2 border-black p-2 rounded-2xl col-start-1 col-end-4 flex flex-wrap">
        {availableTags.map((tag) => (
          <p
            key={tag.id}
            className={cn(
              'bg-lighterPink p-2 rounded-2xl cursor-pointer',
              selectedTags.has(tag) ? 'bg-lightPink' : 'bg-lighterPink'
            )}
            onClick={() => {
              setSelectedTags(new Set(selectedTags).add(tag));
              addTag(tag.text);
            }}
          >
            {tag.text}
          </p>
        ))}
      </div>
      <Input value={'hello'} className="hidden" />
      <div className="flex flex-wrap gap-2">
        {Array.from(selectedTags).map((tag) => (
          <div className="bg-purple p-2 rounded-2xl flex items-center gap-1 ">
            <p
              className="text-white p-2 rounded-full bg-black cursor-pointer"
              onClick={() => {
                handleRemove(tag);
                handleRemoveFxn(tag.text);
              }}
            >
              X
            </p>
            <p key={tag.id} className="">
              {tag.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withFormsy(CustomTagsInput);
