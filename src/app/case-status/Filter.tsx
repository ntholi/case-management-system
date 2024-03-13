'use client';
import { ActionIcon, CloseButton, Group, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useQueryState } from 'nuqs';
import React, { useState } from 'react';

export default function Filter() {
  const [rciNo, setRciNo] = useQueryState('rciNo');
  const [value, setValue] = useState('');
  return (
    <Group gap={5}>
      <TextInput
        placeholder='RCI Number'
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSection={
          <CloseButton
            aria-label='Clear input'
            onClick={() => {
              setValue('');
              setRciNo(null);
            }}
            style={{ display: rciNo ? undefined : 'none' }}
          />
        }
      />
      <ActionIcon variant='light' size={'lg'} onClick={() => setRciNo(value)}>
        <IconSearch size={'1rem'} />
      </ActionIcon>
    </Group>
  );
}
