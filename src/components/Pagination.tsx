import { Dispatch, FC, MouseEvent, SetStateAction } from 'react';

interface IPaginationProps {
  total: number;
  setOffset: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  limit: number;
}

const Pagination: FC<IPaginationProps> = ({ total, setLimit, setOffset, limit }) => {
  const pages = new Array(Math.ceil(total / limit));
  const onClick = (e: MouseEvent) => {
    const n = +(e.target as HTMLButtonElement).textContent!;
    setOffset((n - 1) * limit);
  };
  return (
    <div>
      {[...pages].map((_, i) => (
        <button key={i + 1} onClick={onClick} value={i + 1}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
