import classNames from 'classnames';
import { useState } from 'react';

export interface CounterProps {
  initialCount?: number;
  min?: number;
  max?: number;
  onChange?(count: number): void;
  onAdd?(): void;
  onRemove?(): void;
  className?: string;
}

const Counter = ({
  initialCount = 0,
  onChange,
  max,
  min = 0,
  className,
  onAdd,
  onRemove,
}: CounterProps): JSX.Element => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    ((max && count < max) || !max) && onAdd  && onAdd();
    ((max && count < max) || !max) && setCount(count + 1);
    onChange && onChange(count);
  };

  const decrement = () => {
    count > min && onRemove && onRemove();
    count > min && setCount(count - 1);
    onChange && onChange(count);
  };

  return (
    <div
      className={classNames([
        'flex flex-row-reverse items-start justify-center gap-[0px]',
        className || '',
      ])}
    >
      <button
        onClick={increment}
        className={classNames([
          'text-blue bg-formblue hover:bg-blue hover:text-white text-[20px] font-[900] px-[8px]',
          { 'rounded-r-[20px]': count > min },
          { 'rounded-[20px]': count === min },
        ])}
      >
        +
      </button>
      {count > min && (
        <>
          <span className="text-formblue text-[20px] font-[900] w-[32px] text-center bg-white">
            {count}
          </span>
          <button
            onClick={decrement}
            className="text-blue bg-formblue hover:bg-blue hover:text-white text-[20px] font-[900] px-[8px] rounded-l-[20px]"
          >
            -
          </button>
        </>
      )}
    </div>
  );
};

export default Counter;
