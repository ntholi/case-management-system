'use client';
import ThemedIconButton from '@/components/ThemedIconButton';
import { ActionIcon, Select, TextInput } from '@mantine/core';
import { CourtCaseStatus, PoliceCaseStatus } from '@prisma/client';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import React from 'react';

export default function Form() {
  const [disabled, setDisabled] = React.useState(true);
  const [caseId, setCaseId] = React.useState('');
  const [message, setMessage] = React.useState('Search RCI No.');
  const [isPending, startTransition] = React.useTransition();

  function search() {
    startTransition(() => {
      setMessage('Loading...');
      axios.get(`/api/cases/${caseId}`);
    });
  }

  return (
    <>
      <TextInput
        name='rciNo'
        label='RCI No.'
        description={message}
        required
        rightSection={
          <ActionIcon variant='light' size={'lg'} onClick={search}>
            <IconSearch size={'1rem'} />
          </ActionIcon>
        }
      />
      <Select
        label='Police Station'
        required
        disabled={disabled}
        name='policeCaseStatus'
        data={
          Object.entries(PoliceCaseStatus).map(([key, value]) => ({
            value: key,
            label: value,
          })) || []
        }
      />
      <Select
        label='Court Case Status'
        name='courtCaseStatus'
        disabled={disabled}
        data={
          Object.entries(CourtCaseStatus).map(([key, value]) => ({
            value: key,
            label: value,
          })) || []
        }
      />
    </>
  );
}
