import FormModal from '@/components/FormModal';
import { Input, TextInput } from '@mantine/core';
import React from 'react';

export default function Form() {
  return (
    <FormModal label={'Create'}>
      <TextInput withAsterisk label='Name' name='name' />
    </FormModal>
  );
}
