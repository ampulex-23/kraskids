import { getH2Style } from '@/helpers/styles';

const Rent = ({ k }: { k: number }): JSX.Element => {
  return (
    <div
      style={{
        transform: `translateY(${900 / k}px)`,
      }}
    >
      <section id="#price" className="flex flex-col gap-[50px] min-w-[1137px]">
        <h2
          className="text-blue"
          style={{ ...getH2Style(k), margin: `${12}px 0 0 ${42/k}px` }}
        >
          Прокат оборудования
        </h2>
        <div className='flex flex-col gap-[15px]'>
          <div>
            <span className='text-blue'  style={{ fontSize: `${40/k}px`, fontWeight: '800' }}>
              Лыжи + палки + ботинки&nbsp;
            </span>
            <span className='text-blue'  style={{ fontSize: `${40/k}px`, fontWeight: '400' }}>
              = 900₽
            </span>
          </div>
          <div>
            <span className='text-blue'  style={{ fontSize: `${40/k}px`, fontWeight: '800' }}>
              Сноуборд + ботинки&nbsp;
            </span>
            <span className='text-blue'  style={{ fontSize: `${40/k}px`, fontWeight: '400' }}>
              = 900₽
            </span>
          </div>
          <div>
            <span className='text-blue'  style={{ fontSize: `${40/k}px`, fontWeight: '800' }}>
              Сноуборд + ботинки&nbsp;
            </span>
            <span className='text-blue'  style={{ fontSize: `${40/k}px`, fontWeight: '400' }}>
              = 400₽
            </span>
          </div>
          <div>
            <span className='text-blue'  style={{ fontSize: `${40/k}px`, fontWeight: '800' }}>
              Комбинезон&nbsp;
            </span>
            <span className='text-blue'  style={{ fontSize: `${40/k}px`, fontWeight: '400' }}>
              = 500₽
            </span>
          </div>
        </div>
        <button
          className="flex items-center justify-center text-white bg-red hover:bg-blue"
          style={{
            marginLeft: `${42/k}px`,
            fontSize: `${20 / k}px`,
            fontWeight: '700',
            borderRadius: `${50 / k}px`,
            width: `${408 / k}px`,
            height: `${70 / k}px`,
            transform: `
            rotate(-2deg)`,
          }}
        >
          Взять на прокат • 24 / 7
        </button>
      </section>
    </div>
  );
};

export default Rent;
