'use client';
import { Modal } from '@mantine/core';
import React from 'react';
import { ZodObject, ZodTypeAny } from 'zod';
import ResourceForm from './ResourceForm';
import { useDisclosure } from '@mantine/hooks';
import ThemedIconButton from './ThemedIconButton';
import { IconEdit } from '@tabler/icons-react';

type Resource = {};

export type Props<T extends Resource> = {
  schema?: ZodObject<{ [K in any]: ZodTypeAny }>;
  initialValues: any;
  onUpdate: (id: any, value: T) => Promise<void>;
  objectId: string | number;
  title: string;
  form: React.ReactElement<any>;
};

export default function UpdateIconButton<T extends Resource>(props: Props<T>) {
  const [opened, { open, close }] = useDisclosure(false);
  const { form, schema, title, onUpdate, objectId, initialValues } = props;

  return (
    <>
      <Modal opened={opened} onClose={close} title={title}>
        <ResourceForm
          initialValues={initialValues}
          schema={schema}
          onCreate={async (it: T) => {
            if (onUpdate) {
              await onUpdate(objectId, it);
              close();
            }
          }}
        >
          {form}
        </ResourceForm>
      </Modal>
      <ThemedIconButton onClick={open}>
        <IconEdit size={'1rem'} />
      </ThemedIconButton>
    </>
  );
}
