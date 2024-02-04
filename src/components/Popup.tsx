import { FC } from 'react';

interface IPopupProps {
  message: string;
  close: () => void;
}

const Popup: FC<IPopupProps> = ({ message, close }) => {
  return (
    <div className='bg absolute left-1/2 top-0 z-40 -translate-x-1/2 animate-drop-down rounded-full bg-white py-4 pl-4 pr-16 text-black'>
      <button
        onClick={close}
        className='btn-round absolute right-3 top-1/2 -translate-y-1/2'
        aria-label='Закрыть попап'
      />

      <p className='text-center text-lg'>{message}</p>
    </div>
  );
};

export default Popup;
