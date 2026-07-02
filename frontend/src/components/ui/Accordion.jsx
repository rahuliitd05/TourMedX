import { useState } from 'react';

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="tmx-accordion">
      {items.map((item, index) => (
        <details
          key={item.question}
          open={openIndex === index}
          className="tmx-accordion__item"
        >
          <summary
            onClick={(event) => {
              event.preventDefault();
              setOpenIndex(openIndex === index ? -1 : index);
            }}
          >
            {item.question}
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
