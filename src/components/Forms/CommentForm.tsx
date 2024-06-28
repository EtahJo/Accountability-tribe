'use client';
import { useState } from 'react';
import Formsy from 'formsy-react';
import CustomInput from '@/components/CustomInput/index';
import { Button } from '@/components/ui/button';
import { FaPaperPlane } from 'react-icons/fa';

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const onValidSubmit = (vals: any) => {
    console.log(vals);
  };
  return (
    <div>
      <Formsy onValidSubmit={onValidSubmit}>
        <CustomInput
          name="content"
          value={comment}
          changeEvent={(e) => setComment(e.target.value)}
          placeholder="React to post (Be Positive)"
          Icon={
            <Button type="submit">
              <FaPaperPlane />
            </Button>
          }
          inputClassNames={'p-2'}
        />
      </Formsy>
    </div>
  );
};

export default CommentForm;
