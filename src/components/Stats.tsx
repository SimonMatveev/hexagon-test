import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { useStatistics } from '../api/api.queries';
import { ESort } from '../types/types';
import { LS_LIMIT, LS_SORT_ORDER } from '../utils/config';
import Filters from './Filters';
import LinkRow from './LinkRow';
import PageLimit from './PageLimit';
import Pagination from './Pagination';
import Preloader from './Preloader';

const Stats: FC = () => {
  const orderSaved = localStorage.getItem(LS_SORT_ORDER);
  const limitSaved = localStorage.getItem(LS_LIMIT);
  const [sortOrder, setSortOrder] = useState<ESort[]>(
    orderSaved ? JSON.parse(orderSaved) : []
  );
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(limitSaved ? +limitSaved : 10);
  const { data, isLoading, error } = useStatistics({
    limit: limit,
    order: sortOrder,
    offset: offset,
  });

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSortOrder((state) => [value as unknown as ESort, ...state]);
  };

  const deleteSort = (e: MouseEvent) => {
    setSortOrder((state) =>
      state.filter((s) => s !== (e.target as HTMLButtonElement).id)
    );
  };

  const onLimitChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setLimit(+value);
    setOffset(0);
  };

  useEffect(
    () => localStorage.setItem(LS_SORT_ORDER, JSON.stringify(sortOrder)),
    [sortOrder.length]
  );

  useEffect(() => localStorage.setItem(LS_LIMIT, limit.toString()), [limit]);
  return (
    <section className='flex flex-grow flex-col'>
      <Filters sortOrder={sortOrder} onSelect={onSelect} deleteSort={deleteSort} />
      <div className='mt-7 flex flex-grow flex-col'>
        <table className='box-border w-full table-fixed text-sm md:text-base'>
          <thead className='border-b-2'>
            <tr>
              <th className='w-full px-2 py-4 font-medium md:px-4'>Полная ссылка</th>
              <th className='box-border w-24 px-2 py-4 font-medium md:w-28 md:px-4'>
                Короткая ссылка
              </th>
              <th className='box-border w-28 px-2 py-4 font-medium md:px-4'>
                Количество переходов
              </th>
            </tr>
          </thead>{' '}
          {!isLoading ? (
            data ? (
              <>
                <tbody>
                  {data.data.map((link) => (
                    <LinkRow key={link.id} link={link} />
                  ))}
                </tbody>
              </>
            ) : (
              <p>{error?.message || 'Что-то пошло не так...'}</p>
            )
          ) : (
            <Preloader />
          )}
        </table>
        <PageLimit limit={limit} onLimitChange={onLimitChange} />
        <Pagination
          total={data?.total || 0}
          setOffset={setOffset}
          setLimit={setLimit}
          limit={limit}
          offset={offset}
        />
      </div>
    </section>
  );
};

export default Stats;
