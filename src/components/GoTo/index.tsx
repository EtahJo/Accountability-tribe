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
    <Link {...linkProps} href={href}>
      <Button className="move-button " size={size}>
        {title}
      </Button>
    </Link>
  );
};

export default GotoButton;
