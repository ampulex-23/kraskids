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
    <div className={classNames('faq-item', { 'collapsed': !isOpen })}>
      <ReactMarkdown>{faq.content}</ReactMarkdown>
      <button onClick={toggle}>
        {isOpen ? '-' : '+'}
      </button>
    </div>
  );

}

export default FAQItem;