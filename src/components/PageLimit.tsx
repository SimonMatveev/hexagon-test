import { ChangeEventHandler, FC } from 'react';

interface IPageLimitProps {
  limit: number;
  onLimitChange: ChangeEventHandler;
}

const PageLimit: FC<IPageLimitProps> = ({ limit, onLimitChange }) => {
  return (
    <div className='mb-8 ml-auto mt-8 flex gap-x-4'>
      <p className='text-base'>Ссылок на странице: </p>
      <ul className='flex gap-x-4 text-base'>
        <li>
          <input
            type='radio'
            id='limit-10'
            name='limit'
            value={10}
            checked={limit === 10}
            onChange={onLimitChange}
            className='peer hidden'
          />
          <label
            className='cursor-pointer peer-checked:font-medium peer-checked:underline'
            htmlFor='limit-10'
          >
            10
          </label>
        </li>
        <li>
          <input
            type='radio'
            id='limit-15'
            name='limit'
            value={15}
            checked={limit === 15}
            onChange={onLimitChange}
            className='peer hidden'
          />
          <label
            className='cursor-pointer peer-checked:font-medium peer-checked:underline'
            htmlFor='limit-15'
          >
            15
          </label>
        </li>
        <li>
          <input
            type='radio'
            id='limit-20'
            name='limit'
            value={20}
            checked={limit === 20}
            onChange={onLimitChange}
            className='peer hidden'
          />
          <label
            className='cursor-pointer peer-checked:font-medium peer-checked:underline'
            htmlFor='limit-20'
          >
            20
          </label>
        </li>
      </ul>
    </div>
  );
};

export default PageLimit;
