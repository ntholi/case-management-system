import { Button, Group, Radio, Select, Stack, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  CaseStatus,
  CourtCaseStatus,
  PoliceCaseStatus,
  Verdict,
} from '@prisma/client';
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
        <Radio.Group label='Verdict' {...form.getInputProps('verdict')}>
          <Group>
            {Object.entries(Verdict).map(([key, value]) => (
              <Radio key={key} value={value} label={value} />
            ))}
          </Group>
        </Radio.Group>
        <Textarea
          label='Sentence'
          disabled={form.values.verdict !== Verdict.GUILTY}
          {...form.getInputProps('sentence')}
        />

        <Button type='submit' loading={isPending} w={'100%'}>
          Save
        </Button>
      </Stack>
    </form>
  );
}
