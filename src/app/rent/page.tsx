'use client';
import Modal from '@/components/Modal';
import Button from '@/components/common/Button';
import Counter from '@/components/common/Counter';
import useAge from '@/hooks/useAge';
import useCfg from '@/hooks/useCfg';
import useRents from '@/hooks/useRent';
import {ClassTag, EquipmentTag, Rent} from '@/types';
import {useState} from 'react';
import { Suspense } from 'react';

const Classes: {tag: ClassTag; name: string}[] = [
  {
    tag: 'econom',
    name: 'Эконом'
  },
  {
    tag: 'comfort',
    name: 'Комфорт'
  },
  {
    tag: 'premium',
    name: 'Премиум'
  }
];

const mainList: EquipmentTag[] = ['set', 'ski', 'snowboard'];

const Book = () => {
  const rents = useRents();
  const cfg = useCfg();
  const age = useAge();
  const [eqclass, setEqClass] = useState<ClassTag>('econom');
  const [cart, setCart] = useState<Rent[]>([]);
  const [numberOfDays, setNumberOfDays] = useState<number>(1);
  const [showModal, setShow] = useState<boolean>(false);
  const openModal = () => setShow(true);

  const updateNumberOfDays = (newCount: number) => {
    setNumberOfDays(newCount);
  };

  if (!rents || !cfg) {
    return null;
  }
  const filtered = rents
    .filter(
      rent =>
        (rent.age === age || age === 'all') &&
        (rent.class === eqclass || !rent.class)
    )
    .map(f => ({...f, description: f.description.replaceAll('+', ' ')}));

  const addRent = (rent: Rent) => () => setCart([...cart, rent]);

  const removeRent = (rent: Rent) => () =>
    setCart([
      ...cart.filter(r => r !== rent),
      ...cart.filter(r => r === rent).slice(1)
    ]);

  const calculateTotal = () =>
    cart.reduce((sum, r) => sum + r.price * numberOfDays, 0);
  const gridTemplateColumns = `minmax(0, 5fr) minmax(0, 7fr) minmax(0, 40px) minmax(50px, 0fr) 0`;
  return (
    <main
      className="flex flex-col items-center gap-[20px] 
      pb-[250px] md:pb-[120px]
      px-[15px] sm:px-[25px] md:px-[30px] lg:px-[35px]"
    >
      <Suspense>
      <div className="flex flex-row items-start justify-start w-full">
        <strong
          className="
        text-blue text-[34px] sm:text-[36px] 
        md:text-[40px] font-[900]"
        >
          Основное снаряжение
        </strong>
      </div>
      {age !== 'kids' && (
        <div
          className="flex flex-row items-start justify-start 
        gap-[10px] sm:gap-[20px] 
        w-full"
        >
          {Classes.map((c, i) => (
            <a
              key={i}
              href="#"
              className="text-blue hover:text-red 
              text-[22px] sm:text-[30px]"
              onClick={() => setEqClass(c.tag)}
              style={{
                fontWeight: c.tag === eqclass ? '900' : '600'
              }}
            >
              {c.name}
            </a>
          ))}
        </div>
      )}
      <div className="flex flex-col items-stretch justify-between origin-top w-full gap-[10px]">
        {filtered
          .filter(r => mainList.includes(r.equipment))
          .map((r, i) => (
            <div
              key={r.equipment + i}
              className="grid gap-[20px] pr-[20px]"
              style={{
                justifyItems: 'start',
                gridTemplateColumns
              }}
            >
              <span
                className="text-blue 
              text-[16px] sm:text-[18px] 
              font-[700]"
              >
                {cfg.attributes.equipment[r.equipment]}
              </span>
              <span
                className="text-blue 
              text-[14px] sm:text-[16px] 
              font-[300] 
              ml-[5px]"
              >
                {r.description}
              </span>
              <strong
                className="text-blue 
              text-[18px] sm:text-[20px] font-[900]"
              >
                {r.price}₽{' '}
              </strong>
              <Counter
                className=""
                initialCount={0}
                onAdd={addRent(r)}
                onRemove={removeRent(r)}
              />
            </div>
          ))}
      </div>
      <div className="flex flex-col items-stretch justify-between origin-top w-full gap-[10px] pr-[20px]">
        <div>
          <strong
            className="text-blue text-[34px] sm:text-[36px] 
        md:text-[40px] font-[900]"
          >
            Дополнительное снаряжение
          </strong>
        </div>
        {filtered
          .filter(r => !mainList.includes(r.equipment))
          .map((r, i) => (
            <div
              key={r.equipment + i}
              className="grid gap-[20px]"
              style={{
                justifyItems: 'start',
                gridTemplateColumns
              }}
            >
              <span
                className="text-blue text-[16px] sm:text-[18px] 
              font-[700]"
              >
                {cfg.attributes.equipment[r.equipment]}
              </span>
              <span
                className="text-blue 
              text-[14px] sm:text-[16px] 
              font-[300] 
              ml-[5px]"
              >
                {r.description}
              </span>
              <strong className="text-blue text-[18px] sm:text-[20px] font-[900]">
                {r.price}₽{' '}
              </strong>
              <Counter
                className="basis-[15%]"
                initialCount={0}
                onAdd={addRent(r)}
                onRemove={removeRent(r)}
              />
            </div>
          ))}
      </div>
      <div
        className="
      bg-formblue
      bg-opacity-50
      backdrop-blur-[5px]
      fixed bottom-0 left-0 w-full p-4
      flex
      items-center md:items-center
      justify-center
      flex-col md:flex-row
      gap-[20px] rounded-t-[10px]"
      >
        <div className="flex items-center flex-row flex-nowrap gap-[10px]">
          <div className="text-blue text-[22px] sm:text-[30px] font-[900]">
            Дней
          </div>
          <Counter
            initialCount={numberOfDays}
            onAdd={() => updateNumberOfDays(numberOfDays + 1)}
            onRemove={() => updateNumberOfDays(Math.max(numberOfDays - 1, 1))}
          />
          <div className="flex flex-row items-center gap-[10px]">
            <div
              className="text-blue 
            text-[22px] sm:text-[30px] font-[900]"
            >
              Сумма
            </div>
            <div
              className="text-blue 
            text-[28px] sm:text-[36px] font-[900]"
            >
              {calculateTotal()}₽
            </div>
          </div>
        </div>

        <Button
          caption="Оформить заказ"
          className="w-full md:w-[auto]"
          onClick={openModal}
        />
      </div>
      <Modal
        page="rent"
        visible={showModal}
        onClose={() => setShow(false)}
        data={{}}
      />
      </Suspense>
    </main>
  );
};

export default Book;
