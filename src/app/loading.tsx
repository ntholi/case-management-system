import { Flex, Loader } from '@mantine/core';
import React from 'react';

export default function Loading() {
  return (
    <Flex w={'100%'} justify={'center'} mt={250}>
      <Loader />
    </Flex>
  );
}
