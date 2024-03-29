import { PersonalInformation } from '@prisma/client';
import React from 'react';

type Props = {
  items?: PersonalInformation[];
};

export default function PersonalInformationRow({ items }: Props) {
  if (!items || items.length === 0) return null;
  if (items.length === 1)
    return (
      <>
        {items[0].firstName} {items[0].surname}
      </>
    );
  return (
    <>
      {items.map((item, index) => (
        <span key={index}>
          {item.surname}
          {index < items.length - 1 && ', '}
        </span>
      ))}
    </>
  );
}
