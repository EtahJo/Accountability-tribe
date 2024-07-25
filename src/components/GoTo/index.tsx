'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import Link, { LinkProps } from 'next/link';

interface GotoButtonProps {
  title: string;
}

const GotoButton = ({
  title,
  href,
  size,
  ...linkProps
}: GotoButtonProps & LinkProps & Pick<ButtonProps, 'size'>) => {
  return (
    <Button className="move-button " size={size}>
      <Link {...linkProps} href={href}>
        {title}
      </Link>
    </Button>
  );
};

export default GotoButton;
