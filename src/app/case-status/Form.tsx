import { Button, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CaseStatus, CourtCaseStatus, PoliceCaseStatus } from '@prisma/client';
import React, { startTransition } from 'react';
import { update } from './actions';

type Props = {
  caseStatus: CaseStatus;
  onClose: () => void;
};

export default function Form({ caseStatus, onClose }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<CaseStatus>({
    initialValues: caseStatus,
  });

  const handleSubmit = async (values: CaseStatus) => {
    startTransition(async () => {
      await update(caseStatus.id, values);
      onClose();
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Select
          label='Police Case Status'
          {...form.getInputProps('policeCaseStatus')}
          data={
            Object.entries(PoliceCaseStatus).map(([key, value]) => ({
              value: value,
              label: value,
            })) || []
          }
        />
        <Select
          label='Court Case Status'
          name='courtCaseStatus'
          {...form.getInputProps('courtCaseStatus')}
          data={
            Object.entries(CourtCaseStatus).map(([key, value]) => ({
              value: value,
              label: value,
            })) || []
          }
        />
        <Button type='submit' loading={isPending} w={'100%'}>
          Save
        </Button>
      </Stack>
    </form>
  );
}
