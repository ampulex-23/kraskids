'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { rules } from './rules';
import { resorts } from './resorts';
import Modal from './Modal';
import { CategoryTag, ResortTag, RuleTag, Offer } from '@/types';
import { getH2Style } from '@/helpers/styles';
import useOffers from '@/hooks/useOffers';
import useCategories from '@/hooks/useCategories';
import useAge from '@/hooks/useAge';

const Price = (): JSX.Element => {
  const [category, setCategory] = useState<CategoryTag>('ind');
  const [resort, setResort] = useState<ResortTag>('roza');
  const [rule, setRule] = useState<RuleTag>('low');
  const [modal, setModal] = useState<boolean>(false);
  const Rule = rules.find((r) => r.id === rule);

  const textColor = (selected: boolean) =>
    selected ? 'text-blue' : 'text-lightblue';

  const offers = useOffers();
  const categories = useCategories();
  const age = useAge();

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

  const catTitle = `text-[34px] sm:text-[26px] md:text-[32px] lg:text-[36px] font-[800]`;

  return (
    <>
      <section id="#price" className="flex flex-col gap-[50px]">
        <h2>Вид обучения</h2>
        <div
          className="flex 
          flex-col sm:flex-row 
          gap-0 md:gap-10 
          px-[20px] md:px-0"
        >
          {categories
            .filter((c) => !c.disabled)
            .map((c) => (
              <div key={c.tag} className={textColor(category === c.tag)}>
                <a
                  href="#price"
                  onClick={() => setCategory(c.tag)}
                  className="flex flex-col"
                >
                  <strong className={catTitle}>{c.title}</strong>
                  {c.subtitle && (
                    <small className="text-[16px] font-[700]">
                      {c.subtitle}
                    </small>
                  )}
                </a>
              </div>
            ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-0 md:gap-[50px]
        px-[20px] md:px-0">
          {resorts.map((r) => (
            <div key={r.tag} className={textColor(resort === r.tag)}>
              <a
                href="#price"
                onClick={() => setResort(r.tag)}
                className="flex flex-col"
              >
                <strong className={catTitle}>{r.title}</strong>
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-0 md:gap-[50px]
        px-[20px] md:px-0">
          {rules
            .filter((r) => r.resort === resort)
            .map((r) => (
              <div key={r.id} className={textColor(rule === r.tag)}>
                <a
                  href="#price"
                  onClick={() => setRule(r.tag)}
                  className="flex flex-col"
                >
                  <small
                    className="text-[16px] font-[700] block"
                    style={{
                      opacity: r.title === '' ? 0 : 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.title || '-'}
                  </small>
                  <strong
                    className={catTitle}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {r.subtitle || ''}
                  </strong>
                </a>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-[20px]">
          {Offers.map((o, i) => (
            <div
              key={i + o.category + ' ' + o.resort}
              className="text-blue gap-[50px] items-center"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span
                className="text-[40px] font-[800]"
                style={{
                  letterSpacing: '-.2ex',
                  whiteSpace: 'nowrap',
                  flexBasis: '60%',
                }}
              >
                {o.days > 1 &&
                  o.days + ([2, 3, 4].includes(+o.days) ? ' дня ' : ' дней ')}
                {o.hours +
                  (o.hours === 1
                    ? ' час'
                    : [2, 3, 4].includes(+o.hours)
                    ? ' часа'
                    : ' часов')}
              </span>
              <span style={{ flexBasis: '10%' }}>—</span>
              <span
                className="text-[40px] font-[600] basis-[40%]"
                style={{ flexGrow: 1 }}
              >
                {o[rule]}₽
              </span>
              <button
                onClick={() => setModal(true)}
                className="bg-red  hover:bg-blue text-white rounded-[20px] h-[50px] px-[30px] text-[18px] font-[700]"
              >
                Забронировать
              </button>
            </div>
          ))}
        </div>
      </section>
      <Modal
        data={{}}
        visible={modal}
        onClose={() => setModal(false)}
        page="book"
      />
    </>
  );
};
export default Price;
