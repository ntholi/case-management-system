'use client';
import React from 'react';
import ThemedButton from './ThemedButton';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ZodObject, ZodTypeAny } from 'zod';
import ResourceForm from './ResourceForm';

type Resource = {};

export type Props<T extends Resource> = {
  schema?: ZodObject<{ [K in any]: ZodTypeAny }>;
  onCreate: (value: T) => Promise<void>;
  title: string;
  form: React.ReactNode;
};

export default function CreateButton<T extends Resource>(props: Props<T>) {
  const [opened, { open, close }] = useDisclosure(false);
  const { form, schema, title, onCreate } = props;

  return (
    <>
      <Modal opened={opened} onClose={close} title={title}>
        <ResourceForm
          schema={schema}
          onCreate={async (it: T) => {
            if (onCreate) {
              await onCreate(it);
              close();
            }
          }}
        >
          {form}
        </ResourceForm>
      </Modal>
      <ThemedButton onClick={open}>New</ThemedButton>
    </>
  );
}
