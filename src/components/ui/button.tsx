import { cn } from '@/lib/utils';
import { Button } from '@headlessui/react'
import { Fragment } from 'react';

const Buttons = () => {
  return (
    <Button as={Fragment}>
      {({ hover, active }) => (
        <button
          className={cn(
            'rounded py-2 px-4 text-sm text-white',
            !hover && !active && 'bg-sky-600',
            hover && !active && 'bg-sky-500',
            active && 'bg-sky-700'
          )}
        >
        </button>
      )}
    </Button>
  );
}

export default Buttons;
