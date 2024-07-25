'use client';
import { Button } from '@/components/ui/button';
import Link, { LinkProps } from 'next/link';

interface GotoButtonProps {
  title: string;
}

const GotoButton = ({
  title,
  href,
  ...linkProps
}: GotoButtonProps & LinkProps) => {
  return (
    <Button className="move-button ">
      <Link {...linkProps} href={href}>
        {title}
      </Link>
    </Button>
  );
};

export default GotoButton;
