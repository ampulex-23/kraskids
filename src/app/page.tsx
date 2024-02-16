/* eslint-disable @next/next/no-img-element */
'use client';

import Adult from '@/components/Adult';
import Beasts from '@/components/Beasts';
import FAQ from '@/components/FAQ';
import Price from '@/components/Prices';
import Rent from '@/components/Rent';
import classNames from 'classnames';
import Image from 'next/image';
import { CSSProperties, ReactEventHandler, useEffect, useState } from 'react';

import './anim.css';
import './anim.scss';
import Button from '@/components/common/Button';

const useWidth = () => {
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};
const useHeight = () => {
  const [width, setHeight] = useState(0);
  const handleResize = () => setHeight(window.innerHeight);
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
};
const useScroll = () => {
  const [scroll, setScroll] = useState(0);
  const handleScroll = () => setScroll(window.scrollY);
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scroll;
};

export default function Home() {
  const w = useWidth();
  const h = useHeight();
  const S = useScroll();
  const s = S / 2;

  const [screen, setScreen] = useState(0);
  const [scroll, setScroll] = useState(0);

  const k = 1920 / w;

  const elkR = 478 / 668;
  const bearR = 516 / 466;

  const sectStyle = (i: number): CSSProperties => ({
    minHeight: 'calc(100vh - 90px)',
    backgroundImage: 'url(/images/bg.svg)',
    backgroundPositionX: 'center',
    backgroundPositionY: `${100 * i}%`,
    backgroundSize: `100%`,
    backgroundRepeat: 'no-repeat',
    scrollSnapAlign: 'end',
    position: 'relative',
    overflow: 'hidden',
  });
  const sectClass = (i: number): string =>
    classNames('flex items-center justify-center bg-blue-500 snap-start', {
      current: i === screen,
    });

  const handleScroll = (e: any): void => {
    const st = Math.round(+e.target.scrollTop) + 10;
    const sh = h - 90;
    const scr = Math.floor(st / sh);
    setScreen(scr);
  };
  return (
    <main
      onScroll={handleScroll}
      className="flex flex-col overflow-y-scroll"
      style={{ scrollSnapType: 'y mandatory', height: 'calc(100vh - 90px)' }}
    >
      <section className={sectClass(0) + ' elk'} style={sectStyle(0)}>
        <h1 className="text-blue font-[900]">
          Детская <br />
          горнолыжная <br />
          школа в <br />
          Красной Поляне
        </h1>
        <Button caption="Забронировать инструктора　•　24/ 7" className="" />
        <img src="/images/elk.svg" alt="" />
      </section>

      <section className={sectClass(1) + ' elk2'} style={sectStyle(2)}>
        <h1 className="text-blue font-[900] text-5xl">
          Подберите
          <br />
          обучение
          <br />
          в удобное
          <br />
          для вас время
        </h1>
        <Button caption="Цены на обучение" className="" href="/book.html?age=kids" />
        <img src="/images/elk2.svg" alt="" />
      </section>

      <section className={sectClass(2) + ' gorilla'} style={sectStyle(3)}>
        <h1 className="text-blue font-[900] text-5xl">
          Прокат
          <br />
          оборудованья
          <br />
          на любой вкус
        </h1>
        <Button
          caption="Взять на прокат　•　24/ 7"
          className=""
          href="/rent.html?age=kids"
        />
        <img src="/images/gorilla.svg" alt="" />
      </section>

      <section className={sectClass(3) + ' monkey'} style={sectStyle(4)}>
        <h1 className="text-blue font-[900] text-5xl">Вопрос-ответ</h1>
        <p className="text-blue font-[500]">
          • Нужен ли скипасс для обучения?
          <br />
          • По каким критериям детей разделяют на группы?
          <br />
          • Можно ли вернуть деньги, если передумаем обучаться?
          <br />
          • С какого снаряда и в каком возрасте
          <br />
          &nbsp;&nbsp;&nbsp;лучше начинать обучение?
          <br />
          • Кто будет заниматься с моим ребенком?
          <br />• На каком курорте проходят занятия?
        </p>
        <Button caption="Частые вопроссы" className="" href="/faq.html?age=kids" />
        <img src="/images/monkey.svg" alt="" />
      </section>

      <section className={sectClass(4) + ' fox'} style={sectStyle(5)}>
        <h1 className="text-blue font-[900] text-5xl">
          Наша школа
          <br />
          для взрослых
        </h1>
        <a href="https://krasski.ru" className="text-red text-5xl font-[900]">
          krasski.ru
        </a>
        <img src="/images/fox.svg" alt="" />
      </section>

      <section className={sectClass(5) + ' contacts'} style={sectStyle(6)}>
        <div className='flex flex-col links'>
          <a
            href="https://telegram.im/@krasskiru"
            className="text-red text-5xl font-[900]"
          >
            телеграм
          </a>
          <a
            href="https://wa.me/+78005114790"
            className="text-red text-5xl font-[900]"
          >
            вотсап
          </a>
          <a
            href="https://vk.com/krasski_club"
            className="text-red text-5xl font-[900]"
          >
            в контакте
          </a>
          <a href="tel:88005114790" className="text-red text-5xl font-[900]">
            8 800 511-47-90
          </a>
          <a
            href="https://kraskids.ru/#footer"
            className="text-red text-5xl font-[900]"
          >
            Обратный звонок
          </a>
        </div>
        <img src="/images/monk2.svg" alt="" />
      </section>
    </main>
  );
}
