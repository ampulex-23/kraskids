import { getH2Style } from '@/helpers/styles';
import Image from 'next/image';
import { useCallback, useState } from 'react';

export interface FAQItemProps {
  title: string;
  text: string | JSX.Element;
  expanded?: boolean;
  k: number;
}

const Questions = [
  {
    title: 'Нужен ли скипасс для обучения?',
    text: `Скипасс нужен каждому катающемуся. В стоимость обучение скипасс не входит. Приобрести его можно в кассах курортов или онлайн. Очень часто для детей действуют специальные предложения, уточняйте у своего инструктора или у операторов на кассах.`,
  },
  {
    title: 'По каким критериям детей разделяют на группы?',
    text: `Если вы у нас впервые, дети будут распределены по результатам устного опроса с учётом возраста, навыков и умений, пожеланий по курорту.
    Если распределение не будет соответствовать на сто процентов, мы переведём ученика в подходящую группу.
    Если вы уже обучались у нас, вы попадёте в группу согласно предыдущим достижениям.`,
  },
  {
    title: 'Как вернуть деньги, если передумаем обучаться?',
    text: (
      <>
        Ознакомьтесь с <a href="#" className='text-red'>политикой возврата бронирования</a>
      </>
    ),
  },
];

const FAQItem = ({
  title,
  text,
  k,
  expanded: e,
}: FAQItemProps): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(e || false);
  const handleToggle = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);
  return (
    <div className='border-b-formblue border-b-[1px] border-solid'>
      <header className="flex flex-row items-center justify-between" style={{padding: 20 / k + 'px'}}>
        <span
          className="text-blue font-[600]"
          style={{
            fontSize: 30 / k + 'px',
            
          }}
        >
          {title}
        </span>
        <button onClick={handleToggle} className="text-blue">
          <svg
            width="16"
            height="16"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M42.4266 45.2548L45.255 42.4264L25.4559 22.6273L45.2548 2.82844L42.4264 1.52588e-05L22.6275 19.7989L2.8286 -2.86102e-06L0.000174999 2.82842L19.7991 22.6273L-1.45435e-05 42.4264L2.82841 45.2548L22.6275 25.4558L42.4266 45.2548Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>
      {expanded && (
        <div
          className="text-blue"
          style={{
            fontSize: 20 / k + 'px',
            paddingLeft: 20 / k + 'px',
            paddingBottom: 20 / k + 'px',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

const FAQ = ({ k }: { k: number }): JSX.Element => {
  return (
    <div
      style={{
        transform: `translateY(${1099 / k}px)`,
        minHeight: `720px`,
      }}
    >
      <section
        id="#price"
        className="flex flex-col gap-[50px] w-[1137px] pl-[0px]"
      >
        <h2
          className="text-blue"
          style={{
            margin: '25px 0 0 42px',
            ...getH2Style(k),
          }}
        >
          Вопрос-ответ
        </h2>
        <div className="flex flex-col">
          {Questions.map((q, i) => (
            <FAQItem
              key={'q-' + i}
              k={k}
              text={q.text}
              title={q.title}
              expanded={i === 0}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
