import classNames from "classnames"

const Button = ({ caption, onClick, className, href }: any): JSX.Element => {
  return (
    <a
      href={href || 'javascript://'}
      onClick={onClick}
      className={classNames([
        'bg-red',
        'hover:bg-blue',
        'text-white',
        'rounded-[20px]',
        'h-[50px]',
        'px-[30px]',
        'text-[18px]',
        'font-[700]',
        'flex',
        'items-center',
        'justify-center',
        ...className.split(' ')
      ])}
    >
      {caption}
    </a>
  );
};

export default Button
