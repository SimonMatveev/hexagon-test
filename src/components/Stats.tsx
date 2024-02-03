import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { useStatistics } from '../api/api.queries';
import { ESort } from '../types/types';
import { LS_LIMIT, LS_SORT_ORDER } from '../utils/config';
import LinkRow from './LinkRow';
import Pagination from './Pagination';
import Preloader from './preloader/Preloader';

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

  const isCounterChosen = sortOrder.some(
    (item) => item === ESort.ASC_COUNTER || item === ESort.DESC_COUNTER
  );
  const isShortChosen = sortOrder.some(
    (item) => item === ESort.ASC_SHORT || item === ESort.DESC_SHORT
  );
  const isTargetChosen = sortOrder.some(
    (item) => item === ESort.ASC_TARGET || item === ESort.DESC_TARGET
  );

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSortOrder((state) => [value as unknown as ESort, ...state]);
  };

  const deleteSort = (e: MouseEvent) => {
    const index = sortOrder.findIndex((s) => s === (e.target as HTMLButtonElement).id);
    setSortOrder((state) => {
      state.splice(index, 1);
      return state;
    });
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

  useEffect(() => localStorage.setItem(LS_LIMIT, limit.toString()), [sortOrder.length]);
  return (
    <section>
      <p>{data?.total}</p>
      <div>
        {!(isCounterChosen && isTargetChosen && isShortChosen) && (
          <select className='text-black' onChange={onSelect}>
            <option>Выберите способ сортировки...</option>
            {!isCounterChosen && (
              <optgroup label='Количество переходов'>
                <option value={ESort.ASC_COUNTER}>По возрастанию</option>
                <option value={ESort.DESC_COUNTER}>По убыванию</option>
              </optgroup>
            )}
            {!isShortChosen && (
              <optgroup label='Имя короткой ссылки'>
                <option value={ESort.ASC_SHORT}>По возрастанию</option>
                <option value={ESort.DESC_SHORT}>По убыванию</option>
              </optgroup>
            )}
            {!isTargetChosen && (
              <optgroup label='Имя полной ссылки'>
                <option value={ESort.ASC_TARGET}>По возрастанию</option>
                <option value={ESort.DESC_TARGET}>По убыванию</option>
              </optgroup>
            )}
          </select>
        )}
        {[...sortOrder].reverse().map((item, i) => (
          <div>
            <p key={i}>{item}</p>
            <button id={item} onClick={deleteSort}>
              x
            </button>
          </div>
        ))}
      </div>
      {!isLoading ? (
        data ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Полная ссылка</th>
                  <th>Короткая ссылка</th>
                  <th>Количество переходов</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((link) => (
                  <LinkRow key={link.id} link={link} />
                ))}
              </tbody>
            </table>
            <div>
              <input
                type='radio'
                id='limit-10'
                name='limit'
                value={10}
                checked={limit === 10}
                onChange={onLimitChange}
              />
              <label htmlFor='limit-10'>10</label>
              <input
                type='radio'
                id='limit-15'
                name='limit'
                value={15}
                checked={limit === 15}
                onChange={onLimitChange}
              />
              <label htmlFor='limit-10'>15</label>
              <input
                type='radio'
                id='limit-20'
                name='limit'
                value={20}
                checked={limit === 20}
                onChange={onLimitChange}
              />
              <label htmlFor='limit-10'>20</label>
            </div>
            <Pagination
              total={data.total}
              setOffset={setOffset}
              setLimit={setLimit}
              limit={limit}
            />
          </div>
        ) : (
          <p>Что то пошло не так...</p>
        )
      ) : (
        <Preloader />
      )}
    </section>
  );
};

export default Stats;
