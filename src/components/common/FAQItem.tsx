import { FAQ } from "@/types";
import classNames from "classnames";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';

import './FAQItem.scss';

const FAQItem = ({ faq }: { faq: FAQ }): JSX.Element => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={toggle} className={classNames('faq-item', { 'collapsed': !isOpen })}>
      <ReactMarkdown>{faq.content}</ReactMarkdown>
      <button>
        {isOpen ? '-' : '+'}
      </button>
    </div>
  );

}

export default FAQItem;