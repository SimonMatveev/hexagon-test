import { FC } from 'react';
import { ISqueezeResponse } from '../types/types';

interface ILinkRowProps {
  link: ISqueezeResponse;
}

const LinkRow: FC<ILinkRowProps> = ({ link }) => {
  return (
    <tr>
      <td>{link.target}</td>
      <td>{link.short}</td>
      <td>{link.counter}</td>
    </tr>
  );
};

export default LinkRow;
