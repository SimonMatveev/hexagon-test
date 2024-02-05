import { useEffect, useState } from 'react';

const useCopy = ({
  fullLink,
  animationDuration,
}: {
  fullLink: string;
  animationDuration: number;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(fullLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), animationDuration - 100);
  };

  useEffect(() => {}, [isCopied]);

  return { onCopy, isCopied };
};

export default useCopy;
