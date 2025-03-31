import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { clsx } from 'clsx';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={clsx('avatar-root', `avatar-${size}`, className)}
    >
      {src && (
        <AvatarPrimitive.Image
          className="avatar-image"
          src={src}
          alt={alt || fallback}
        />
      )}
      <AvatarPrimitive.Fallback className="avatar-fallback">
        {fallback.substring(0, 2)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
