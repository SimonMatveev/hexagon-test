import { Dispatch, FC, MouseEvent, SetStateAction } from 'react';

interface IPaginationProps {
  total: number;
  setOffset: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  limit: number;
  offset: number;
}

const Pagination: FC<IPaginationProps> = ({ total, setOffset, limit, offset }) => {
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(total / limit);

  const onClick = (e: MouseEvent) => {
    const n = +(e.target as HTMLButtonElement).textContent!;
    setOffset((n - 1) * limit);
  };
  const onFirstClick = () => setOffset(0);
  const onLastClick = () => setOffset((totalPages - 1) * limit);
  if (totalPages === 1 || totalPages === 0) return null;
  return (
    <ul className='mt-8 flex justify-center gap-x-2 text-base md:gap-x-3 md:text-lg'>
      <li>
        <button
          aria-label='На первую страницу'
          onClick={onFirstClick}
          className={`${currentPage - 3 <= 0 ? 'invisible ' : ''}bg-triangle-white-l h-10 w-10 cursor-pointer bg-contain transition-colors hover:opacity-70 active:opacity-60`}
        />
      </li>
      <li>
        <button
          className={`${currentPage - 2 <= 0 ? 'invisible ' : ''}h-10 w-10 cursor-pointer rounded-md bg-white font-medium text-black transition-colors hover:opacity-70 active:opacity-60`}
          onClick={onClick}
        >
          {currentPage - 2}
        </button>
      </li>
      <li>
        <button
          className={`${currentPage - 1 <= 0 ? 'invisible ' : ''}h-10 w-10 cursor-pointer rounded-md bg-white font-medium text-black transition-colors hover:opacity-70 active:opacity-60`}
          onClick={onClick}
        >
          {currentPage - 1}
        </button>
      </li>
      <li className='flex items-center justify-center font-bold md:px-2'>
        {currentPage}
      </li>
      <li>
        <button
          onClick={onClick}
          className={`${currentPage + 1 > totalPages ? 'invisible ' : ''}h-10 w-10 cursor-pointer rounded-md bg-white font-medium text-black transition-colors hover:opacity-70 active:opacity-60`}
        >
          {currentPage + 1}
        </button>
      </li>
      <li>
        <button
          onClick={onClick}
          className={`${currentPage + 2 > totalPages ? 'invisible ' : ''}h-10 w-10 cursor-pointer rounded-md bg-white font-medium text-black transition-colors hover:opacity-70 active:opacity-60`}
        >
          {currentPage + 2}
        </button>
      </li>
      {currentPage + 3 <= totalPages && (
        <li>
          <button
            onClick={onLastClick}
            aria-label='На последнюю страницу'
            className={`${currentPage + 3 > totalPages ? 'invisible ' : ''}bg-triangle-white-r h-10 w-10 cursor-pointer bg-contain transition-colors hover:opacity-70 active:opacity-60`}
          />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
