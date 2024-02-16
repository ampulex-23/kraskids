import { EqTag, Offer, RuleTag } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

interface ModalProps {
  visible: boolean;
  page: 'book' | 'rent';
  offer?: Offer;
  rule: RuleTag;
  persons: number;
  equipement: EqTag;
  onClose(): void;
}

const BookModal = ({
  visible,
  onClose,
  offer,
  rule,
  equipement,
  persons = 1,
}: ModalProps): JSX.Element | null => {
  const [success, setSuccess] = useState<boolean>(false);
  const cats = {
    ind: 'инди',
    group: 'группа',
    course: 'курсы',
    freeride: 'фрирайд'
  };
  const ages = {
    kids: 'дети',
    adult: 'взрослые',
    all: '-'
  };
  const resorts = {
    kp: 'КП',
    roza: 'РХ',
    gazprom: 'ГП',
    all: ''
  };
  if (!visible || !offer) {
    return null;
  }

  const inputClasses =
    'placeholder:text-formblue outline-none rounded-[20px] border-solid border-[2px] px-[20px] border-formblue h-[60px] text-[20px] font-[700] text-formblue';
  const getEq = (eq: EqTag) => ({
    ski: 'лыжи',
    snowboard: 'борд',
    all: 'любое'
  }[eq]);
  return (
    <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-10
    bg-formblue
      bg-opacity-50
      backdrop-blur-[5px]">
      {!success && (
        <div className="w-[550px] h-[542px] rounded-[50px] bg-white flex flex-col pt-[40px] px-[50px] gap-[20px] relative">
          <h3 className="text-[40px] font-[800] text-blue" style={{ lineHeight: '45px' }}>
            Забронировать инструктора
          </h3>
          <span className="text-[20px] font-[600] pb-[0px]">Перезвоним в течении 10 мин</span>
          <iframe name='redirect' className='hidden'></iframe>
          <form
            id="book"
            name="book"
            action="https://forms.amocrm.ru/queue/add"
            method="POST"
            target="redirect"
            encType="multipart/form-data"
            className="flex flex-col gap-[20px] relative"
            onSubmit={(e) => {
              
              //e.preventDefault();
              setTimeout(() =>setSuccess(true) , 3000);
            }}
            onError={e => {
              console.log(e);
            }}
          >
            <input type="hidden" name="form_id" value="1256430" />
            <input type="hidden" name="hash" value="45dea0442a7e9c4ce85f46de4ba71062" />
            <input type="hidden" name="user_origin" value="" />
            <input className={inputClasses} placeholder="имя" name="fields[name_1]" />
            <input className={inputClasses} placeholder="телефон" name="fields[466825_1][229613]" />
            <input type="hidden" name="fields[827657_2]" value={resorts[offer.resort]} />
            <input type="hidden" name="fields[479753_2]" value={offer.days} />
            <input type="hidden" name="fields[827663_2]" value={offer[rule]} />
            <input type="hidden" name="fields[note_2]" value={offer.title} />
            <input type="hidden" name="fields[479757_2]" value={getEq(equipement)} />
            <input type="hidden" name="fields[479689_2]" value={persons} />
            <input
              type="hidden"
              name="fields[name_2]"
              value={`${cats[offer.category] + (offer.category === 'group' ? (' ' + persons + ' чел') : '')}${equipement !== 'all' ? ' ' + getEq(equipement) : ''} ${ages[offer.age]} ${resorts[offer.resort]} ${offer.days}д ${offer.hours}ч`}
            />

            <button
              onClick={(e) => {
                //debugger;
                const f: HTMLFormElement | null = document.querySelector('#book')
                f?.submit();
              }}
              type="submit"
              form="book"
              className="bg-blue text-white hover:bg-lightblue text-[20px] font-[700] rounded-[20px] flex items-center justify-center h-[60px]"
            >
              Отправить
            </button>
            <p className="text-[16px] font-[600] text-blue">
              Оставляя заявку вы даёте{' '}
              <a className="text-lightblue">согласие на обработку персональных данных</a>
            </p>
            <button
              type="reset"
              onClick={onClose}
              className="absolute reset-button"
              style={{
                top: 'calc(-50% - 25px)',
                right: '-25px',
              }}
            >
              <img src="/images/close.svg" />
            </button>
          </form>
        </div>
      )}
      {success && (
        <div className="w-[550px] h-[542px] rounded-[50px] bg-white flex flex-col pt-[40px] px-[50px] gap-[20px] relative">
          <h3 className="text-[40px] font-[800] text-blue" style={{ lineHeight: '45px' }}>
            Спасибо за заявку!
          </h3>
          <span className="text-[20px] font-[600] pb-[0px]">Мы свяжемся с вами в ближайшее время</span>
          <button
            onClick={onClose}
            className="bg-blue text-white hover:bg-lightblue text-[20px] font-[700] rounded-[20px] flex items-center justify-center h-[60px]"
          >
            Вернуться на сайт
          </button>
        </div>
      )}
    </div>
  );
};

export default BookModal;
