import { Title } from '@mantine/core';
import React from 'react';

type Props = {
  text: string;
};

export default function PageTitle({ text }: Props) {
  return (
    <Title size={'1rem'} fw={500}>
      {text}
    </Title>
  );
}
