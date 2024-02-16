'use client';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { rules } from '@/components/rules';
import { resorts } from '@/components/resorts';
import Modal from '@/components/Modal';
import { CategoryTag, ResortTag, RuleTag, Offer, EqTag } from '@/types';
import { getH2Style } from '@/helpers/styles';
import useOffers from '@/hooks/useOffers';
import useCategories from '@/hooks/useCategories';
import useAge from '@/hooks/useAge';
import BookModal from '@/components/BookModal';
import Counter from '@/components/common/Counter';
import { Suspense } from 'react';

import './anim.scss';

const Book = () => {
  const [category, setCategory] = useState<CategoryTag>('ind');
  const [resort, setResort] = useState<ResortTag>('roza');
  const [rule, setRule] = useState<RuleTag>('low');
  const [rtag, setRtag] = useState<number>(0);
  const [hours, setHours] = useState<number>(1);
  const [days, setDays] = useState<number>(1);
  const [eq, setEq] = useState<EqTag>('all');
  const [modal, setModal] = useState<boolean>(false);
  const [offer, setOffer] = useState<Offer | undefined>(undefined);
  const [persons, setPersons] = useState<number>(2);
  const [step, setStep] = useState<number>(1);

  const Rule = rules.find((r) => r.id === rule);

  const textColor = (selected: boolean) =>
    selected ? 'text-blue' : 'text-lightblue';

  const offers = useOffers();
  const categories = useCategories();
  const age = useAge();

  const getEqTitle = (eq: EqTag): string => ({
    ski: 'Лыжи',
    snowboard: 'Сноуборд',
    all: 'Не важно'
  }[eq]);

  if (!offers || !categories) {
    return <></>;
  }

  const Offers = offers.filter(
    (o) =>
      (o.resort === resort || o.resort === 'all') &&
      o.category === category &&
      (o.age === age || age === 'all') &&
      !o.disabled &&
      !o.secondary
  );

  const Days = new Set(Offers.map((o) => o.days));
  const Hours = new Set(
    Offers.filter((o) => o.days === days).map((o) => o.hours)
  );

  const catTitle =
    'text-[28px] sm:text-[26px] md:text-[32px] lg:text-[36px] font-[800] pb-4 sm:pb-0';
  const catH3 =
    'text-[34px] font-[700] block sm:hidden pt-4 text-blue uppercase';
  const sectClasses =
    'flex flex-col gap-8 md:gap-12 w-full min-h-screen sm:min-h-fit sm:h-fit snap-start';
  
  return (
    <main
      className="flex flex-col items-start gap-[20px] 
      pb-[250px] md:pb-[120px] snap-y snap-mandatory
      overflow-y-scroll scroll-smooth
      px-[15px] sm:px-[25px] md:px-[30px] lg:px-[35px]"
      style={{
        scrollSnapType: 'y mandatory',
        height: `calc(100vh - 90px)`,
      }}
    >
      <Suspense>
      <section className={sectClasses + ' shown'} style={{ scrollMarginBottom: '-90px' }}>
        <h3 className={catH3} style={{ lineHeight: '46px' }}>
          Вид обучения
        </h3>
        <div className="flex flex-row flex-wrap gap-4 md:gap-10">
          {categories
            .filter((c) => !c.disabled)
            .map((c) => (
              <div
                key={c.tag}
                className={classNames(
                  textColor(category === c.tag),
                  'flex flex-col',
                  'w-full sm:w-fit'
                )}
              >
                <a
                  href="#resorts"
                  onClick={() => { setCategory(c.tag); setStep(2); }}
                  className="flex flex-col"
                >
                  <strong className={classNames(catTitle, 'text-[30px]')}>
                    {c.title}
                  </strong>
                  {c.subtitle && (
                    <small className="text-[16px] font-[700]">
                      {c.subtitle}
                    </small>
                  )}
                </a>
              </div>
            ))}
        </div>
      </section>
      <section className={sectClasses + (step > 1 ? ' shown' : '')} style={{ scrollMarginBottom: '-90px' }}>
        <h3 id="resorts" className={catH3} style={{ lineHeight: '46px' }}>
          Выберите курорт
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-10">
          {resorts.map((r) => (
            <div
              key={r.tag}
              className={classNames(
                textColor(resort === r.tag),
                'flex flex-col'
              )}
            >
              <a
                href="#eq"
                onClick={() => { setResort(r.tag); setStep(3); }}
                className="pb-12"
              >
                <strong className={classNames(catTitle, 'text-[36px]')}>
                  {r.title}
                </strong>
              </a>
            </div>
          ))}
        </div>
      </section>
      <section className={sectClasses + (step > 2 ? ' shown' : '')} style={{ scrollMarginBottom: '-90px' }}>
        <h3 id="eq" className={catH3} style={{ lineHeight: '46px' }}>
          Выберите оборудованье
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-10">
          {(['ski', 'snowboard', 'all'] as EqTag[]).map((r) => (
            <div
              key={r}
              className={classNames(
                textColor(eq === r),
                'flex flex-col'
              )}
            >
              <a
                href="#rules"
                onClick={() => { setEq(r); setStep(4); }}
                className="pb-12"
              >
                <strong className={classNames(catTitle, 'text-[36px]')}>
                  {getEqTitle(r)}
                </strong>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={sectClasses + (step > 3 ? ' shown' : '')} style={{ scrollMarginBottom: '-90px' }}>
        <h3 id="rules" className={catH3} style={{ lineHeight: '46px' }}>
          Когдая хотите заниматься?
        </h3>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 md:gap-10">
          {rules
            .filter((r) => r.resort === resort)
            .map((r, i) => (
              <div
                key={r.id}
                className={classNames(
                  textColor(i === rtag),
                  'flex flex-col'
                )}
              >
                <a href="#period" onClick={() => { 
                  setRule(r.tag); 
                  setRtag(i);
                  setStep(5);
                }}>
                  <small
                    className={classNames('text-[16px] font-[700] block', {
                      'opacity-0': r.title === '',
                    })}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {r.title || '-'}
                  </small>
                  <strong className={catTitle} style={{ whiteSpace: 'nowrap' }}>
                    {r.subtitle || ''}
                  </strong>
                </a>
              </div>
            ))}
        </div>
      </section>
      <section className={sectClasses + (step > 4 ? ' shown' : '')} style={{ scrollMarginBottom: '-90px' }}>
        <h3 id="period" className={catH3} style={{ lineHeight: '46px' }}>
          Длительность занятий
        </h3>
        <div className='flex flex-col md:flex-row md:items-center md:gap-4 md:py-8'>
          <strong className="text-[28px] text-blue font-[900]">Дней</strong>
          <div className="flex flex-row gap-2 md:gap-2 md:items-center">
            {Array.from(Days)
              .sort()
              .map((d) => (
                <button
                  key={d}
                  className={classNames(
                    'text-[28px] font-[900] px-6 py-1 rounded-xl',
                    `text-${d === days ? 'white' : 'blue'}`,
                    `bg-${d !== days ? 'formblue' : 'blue'}`
                  )}
                  onClick={() => setDays(d)}
                >
                  {d}
                </button>
              ))}
          </div>
          <strong className="text-[28px] text-blue font-[900] block">
            Часов
          </strong>
          <div className="flex flex-row flex-wrap gap-2 md:gap-2 items-center">
            {Array.from(Hours)
              .sort()
              .map((h) => (
                <a
                  key={h}
                  href={category === 'group' ? '#period' : '#offers'}
                  className={classNames(
                    'text-[28px] font-[900] px-6 py-1 rounded-xl',
                    `text-${h === hours ? 'white' : 'blue'}`,
                    `bg-${h !== hours ? 'formblue' : 'blue'}`
                  )}
                  onClick={() => setHours(h)}
                >
                  {h}
                </a>
              ))}
          </div>
          {category === 'group' &&
          <>
            <strong className="text-[28px] text-blue font-[900] block">
              Человек
            </strong>
            <div className="flex flex-row flex-wrap gap-2 md:gap-6 items-center">
            <div className="flex flex-row flex-wrap gap-2 md:gap-2 items-center">
            {[2, 3, 4, 5, 6]
              .map((h) => (
                <a
                  key={h}
                  href="#offers"
                  className={classNames(
                    'text-[28px] font-[900] px-6 py-1 rounded-xl',
                    `text-${h === persons ? 'white' : 'blue'}`,
                    `bg-${h !== persons ? 'formblue' : 'blue'}`
                  )}
                  onClick={() => setPersons(h)}
                >
                  {h}
                </a>
              ))}
          </div>
            </div>
            </>}
          </div>
      </section>
      <section className={sectClasses + (step > 4 ? ' shown' : '')} style={{ scrollMarginBottom: '-90px' }}>
        <h3 id="offers" className={catH3} style={{ lineHeight: '46px' }}>
          Выберите занятие
        </h3>
        <div
          className="
          w-full
          grid 
          grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5
          gap-8"
        >
          {Offers.filter((o) => o.days === days && o.hours === hours).map(
            (o, i) => (
              <div
                key={i + o.category + ' ' + o.resort}
                className="
              relative
              h-fit
              group
              p-4 bg-lightblue rounded-xl
              text-blue 
              grid grid-cols-2
              gap-4 items-center justify-between text-center"
              >
                <span className="text-[40px] font-[900] col-span-3">
                  {o[rule] * (category === 'group' ? persons - 1 : 1)}₽
                </span>
                <button
                  onClick={() => setOffer(o)}
                  className="
                bg-red hover:bg-blue text-white 
                rounded-[20px] h-[50px] px-[30px] text-[18px] font-[700]
                col-span-3"
                >
                  Забронировать
                </button>
              </div>
            )
          )}
        </div>
        <BookModal
          rule={rule}
          offer={offer}
          visible={true}
          equipement={eq}
          persons={persons}
          onClose={() => setOffer(undefined)}
          page="book"
        />
        <div className="h-[400px]"></div>
      </section>
      </Suspense>
    </main>
  );
};

export default Book;
