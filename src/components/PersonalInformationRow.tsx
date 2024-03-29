import { Anchor } from '@mantine/core';
import { PersonalInformation } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

type Props = {
  items?: PersonalInformation[];
};

export default function PersonalInformationRow({ items }: Props) {
  if (!items || items.length === 0) return null;
  if (items.length === 1)
    return (
      <Anchor component={Link} href={`/personal-info/${items[0].id}`}>
        {items[0].firstName} {items[0].surname}
      </Anchor>
    );
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <Anchor component={Link} href={`/personal-info/${item.id}`}>
            {item.surname}
          </Anchor>
          {index < items.length - 1 && ', '}
        </React.Fragment>
      ))}
    </>
  );
}
