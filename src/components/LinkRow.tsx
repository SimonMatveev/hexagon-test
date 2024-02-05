import { FC } from 'react';
import useCopy from '../hooks/useCopy';
import { ISqueezeResponse } from '../types/types';
import { DURATION_ANIMATION_FADE_AWAY, URL_BASE } from '../utils/config';
import { buttonize } from '../utils/functions';

interface ILinkRowProps {
  link: ISqueezeResponse;
}

const LinkRow: FC<ILinkRowProps> = ({ link }) => {
  const { isCopied, onCopy } = useCopy({
    fullLink: `${URL_BASE}/s/${link.short}`,
    animationDuration: DURATION_ANIMATION_FADE_AWAY,
  });
  const { isCopied: isTargetCopied, onCopy: onTargetCopy } = useCopy({
    fullLink: link.target,
    animationDuration: DURATION_ANIMATION_FADE_AWAY,
  });
  return (
    <tr className='relative h-10 w-full align-middle'>
      <td
        {...buttonize(onTargetCopy)}
        className='relative cursor-pointer overflow-hidden text-ellipsis text-nowrap pr-4 transition-colors hover:bg-grey-dark'
      >
        {link.target}
        {isTargetCopied && (
          <span
            className={`${isTargetCopied ? 'animate-fade-away ' : ''}absolute right-0 top-1/2 -translate-y-1/2 rounded-md bg-green-cold p-2 text-xxs sm:text-xs md:text-sm`}
          >
            Cкопировано
          </span>
        )}
      </td>
      <td
        {...buttonize(onCopy)}
        className='relative box-border w-24 cursor-pointer px-2 text-center transition-colors hover:bg-grey-dark md:px-4'
      >
        {link.short}
        {isCopied && (
          <span
            className={`${isCopied ? 'animate-fade-away ' : ''}absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-green-cold p-2 text-xxs sm:text-xs md:left-full md:translate-x-0 md:text-sm`}
          >
            Cкопировано
          </span>
        )}
      </td>
      <td className='box-border w-28 px-2 text-center md:px-4'>{link.counter}</td>
    </tr>
  );
};

export default LinkRow;
