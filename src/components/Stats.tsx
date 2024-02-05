import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStatistics } from '../api/api.hooks';
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
    <section className='mx-auto box-border flex w-full max-w-6xl flex-grow flex-col px-4 '>
      <Filters sortOrder={sortOrder} onSelect={onSelect} deleteSort={deleteSort} />
      <div className='mt-7 flex flex-grow flex-col'>
        {!isLoading ? (
          data ? (
            data.data.length > 0 ? (
              <table className='box-border w-full table-fixed text-sm md:text-base'>
                <thead className='border-b-2'>
                  <tr>
                    <th className='w-full px-2 py-4 font-medium md:px-4'>
                      Полная ссылка
                    </th>
                    <th className='writing-v sm:writing-h box-border w-16 px-2 py-4 font-medium sm:w-28 md:px-4'>
                      Короткая ссылка
                    </th>
                    <th className='writing-v sm:writing-h box-border w-16 px-2 py-4 font-medium sm:w-28 md:px-4'>
                      Количество переходов
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((link) => (
                    <LinkRow key={link.id} link={link} />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='flex w-full flex-grow flex-col justify-center self-stretch align-middle'>
                <p className='text-center'>Ссылок пока нет!</p>
                <p className='text-center'>
                  Перейдите на{' '}
                  <Link
                    className='underline-green text-green-cold transition-colors hover:text-green-cold-hover active:text-green-cold-active'
                    to='/'
                  >
                    главную
                  </Link>
                  , чтобы добавить
                </p>
              </div>
            )
          ) : (
            <div className='flex w-full flex-grow flex-col justify-center self-stretch align-middle'>
              <p className='mb-4 text-center font-bold text-green-cold'>Ошибка</p>
              <p className='text-center'>{error?.message || 'Что-то пошло не так...'}</p>
            </div>
          )
        ) : (
          <Preloader />
        )}
        <div className='mt-auto flex flex-col'>
          <Pagination
            total={data?.total || 0}
            setOffset={setOffset}
            setLimit={setLimit}
            limit={limit}
            offset={offset}
          />
          <PageLimit limit={limit} onLimitChange={onLimitChange} />
        </div>
      </div>
    </section>
  );
};

export default Stats;
