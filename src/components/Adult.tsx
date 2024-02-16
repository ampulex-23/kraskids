import { getH2Style } from '@/helpers/styles';

const Adult = ({ k }: { k: number }): JSX.Element => {
  return (
    <div
      style={{
        transform: `translateY(${1161 / k}px)`,
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
            lineHeight: 90 / k + 'px',
            ...getH2Style(k),
          }}
        >
          Наша школа
          <br />
          для взрослых
        </h2>
        <a href="krasski.ru" className="text-red hover:text-blue" style={{
          fontSize: (170 / k) + 'px',
          fontWeight: '900',
          letterSpacing: (-17 / k) + 'px'
        }}>
          KRASSKI.RU
        </a>
      </section>
    </div>
  );
};

export default Adult;
