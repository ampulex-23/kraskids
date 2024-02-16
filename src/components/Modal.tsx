import Image from 'next/image';
import { useCallback } from 'react';

interface ModalProps {
  visible: boolean;
  page: 'book' | 'rent';
  data: unknown;
  onClose(): void;
}
const Modal = ({ visible, onClose }: ModalProps): JSX.Element | null => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);
  if (!visible) {
    return null;
  }
  const inputClasses =
    'placeholder:text-formblue outline-none rounded-[20px] border-solid border-[2px] px-[20px] border-formblue h-[60px] text-[20px] font-[700] text-formblue';
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-overlay flex items-center justify-center z-10">
      <div className="w-[550px] h-[542px] rounded-[50px] bg-white flex flex-col pt-[40px] px-[50px] gap-[20px] relative">
        <h3
          className="text-[40px] font-[800] text-blue"
          style={{ lineHeight: '45px' }}
        >
          Забронировать инструктора
        </h3>
        <span className="text-[20px] font-[600] pb-[0px]">
          Перезвоним в течении 10 мин
        </span>
        <input className={inputClasses} placeholder="имя" />
        <input className={inputClasses} placeholder="телефон" />
        <button
          className="bg-blue text-white hover:bg-lightblue text-[20px] font-[700]
          rounded-[20px] flex items-center justify-center h-[60px]"
        >
          Отправить
        </button>
        <p className="text-[16px] font-[600] text-blue">
          Оставляя заявку вы даёте{' '}
          <a className="text-lightblue">
            согласие на обработку персональных данных
          </a>
        </p>
        <button
          onClick={handleClose}
          className="absolute"
          style={{
            marginLeft: '506px',
            width: '46px',
            height: '46px',
            marginTop: '-86px',
          }}
        >
          <Image width={46} height={46} src="/images/close.svg" alt="close" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
