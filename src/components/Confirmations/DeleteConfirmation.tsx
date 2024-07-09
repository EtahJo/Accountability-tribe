'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationProps {
  trigger: React.ReactNode;
  confirmationMessage: string;
  consequenceMessage: string;
  action: React.ReactNode;
}

const DeleteConfirmation = ({
  trigger,
  confirmationMessage,
  consequenceMessage,
  action,
}: DeleteConfirmationProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="z-[200]">
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmationMessage}</AlertDialogTitle>
          <AlertDialogDescription>{consequenceMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-transparent shadow-none hover:bg-transparent">
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
