import { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import { ESort } from '../types/types';

interface IFiltersProps {
  sortOrder: ESort[];
  onSelect: ChangeEventHandler;
  deleteSort: MouseEventHandler;
}

const Filters: FC<IFiltersProps> = ({ sortOrder, onSelect, deleteSort }) => {
  const isCounterChosen = sortOrder.some(
    (item) => item === ESort.ASC_COUNTER || item === ESort.DESC_COUNTER
  );
  const isShortChosen = sortOrder.some(
    (item) => item === ESort.ASC_SHORT || item === ESort.DESC_SHORT
  );
  const isTargetChosen = sortOrder.some(
    (item) => item === ESort.ASC_TARGET || item === ESort.DESC_TARGET
  );

  return (
    <div className='flex flex-wrap justify-between gap-4'>
      {!(isCounterChosen && isTargetChosen && isShortChosen) && (
        <select
          className='min-h-12 w-full max-w-full cursor-pointer rounded-md px-4 text-base text-black md:w-auto md:text-lg'
          onChange={onSelect}
        >
          <option className='text-base'>Выберите способ сортировки...</option>
          {!isCounterChosen && (
            <optgroup label='Количество переходов' className='border-b font-medium'>
              <option className='text-base' value={ESort.ASC_COUNTER}>
                По возрастанию
              </option>
              <option className='text-base' value={ESort.DESC_COUNTER}>
                По убыванию
              </option>
            </optgroup>
          )}
          {!isShortChosen && (
            <optgroup label='Имя короткой ссылки' className='font-medium'>
              <option className='text-base' value={ESort.ASC_SHORT}>
                По возрастанию
              </option>
              <option className='text-base' value={ESort.DESC_SHORT}>
                По убыванию
              </option>
            </optgroup>
          )}
          {!isTargetChosen && (
            <optgroup label='Имя полной ссылки' className='font-medium'>
              <option className='text-base' value={ESort.ASC_TARGET}>
                По возрастанию
              </option>
              <option className='text-base' value={ESort.DESC_TARGET}>
                По убыванию
              </option>
            </optgroup>
          )}
        </select>
      )}
      <ul className='ml-auto flex w-full flex-wrap justify-end gap-x-8 gap-y-2 md:w-auto md:justify-between md:gap-x-10'>
        {[...sortOrder].reverse().map((item, i) => (
          <li
            key={`${item}-${i}`}
            className='md:trail-triangle relative flex w-full items-center justify-between gap-2 rounded-full bg-transparent py-2 pl-2 pr-1 last:after:content-[none] sm:w-auto md:bg-green-cold md:pl-3 md:pr-2'
          >
            <p className='text-sm md:text-base'>{item}</p>
            <button id={item} onClick={deleteSort} className='btn-round h-8 w-8'></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
