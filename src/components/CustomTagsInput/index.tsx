'use Client';
import { useState } from 'react';
import { withFormsy } from 'formsy-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import InputLabel, { InputLabelProps } from '../InputLabel/index';

interface CustomTagsInputProps {
  addTag: (tag: any) => void;
  handleRemoveFxn: (tag: any) => void;
  availableTags: { text?: string; title?: string; id?: string | number }[];
  presentTags?: Set<string>;
}

const CustomTagsInput = ({
  lable,
  labelIcon,
  required,
  addTag,
  handleRemoveFxn,
  availableTags,
  presentTags,
}: CustomTagsInputProps & InputLabelProps) => {
  const [selectedTags, setSelectedTags] = useState(presentTags || new Set());
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
        {availableTags.map((tag, index) => (
          <p
            key={index}
            className={cn(
              'bg-lighterPink p-2 rounded-2xl cursor-pointer',
              selectedTags.has(tag) ? 'bg-lightPink' : 'bg-lighterPink'
            )}
            onClick={() => {
              setSelectedTags(new Set(selectedTags).add(tag.text || tag.title));
              addTag(tag.text || tag.id);
            }}
          >
            {tag.text || tag.title}
          </p>
        ))}
      </div>
      <Input value={'hello'} className="hidden" />
      <div className="flex flex-wrap gap-2">
        {Array.from(selectedTags).map((tag: any, index) => (
          <div
            className="bg-purple p-2 rounded-2xl flex items-center gap-1 "
            key={index}
          >
            <p
              className="text-white p-2 rounded-full bg-black cursor-pointer"
              onClick={() => {
                handleRemove(tag);
                handleRemoveFxn(tag);
              }}
            >
              X
            </p>
            <p className="">{tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withFormsy(CustomTagsInput);
