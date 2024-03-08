'use client';
import { Button, Modal, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React, { PropsWithChildren } from 'react';
import { ZodObject, ZodTypeAny } from 'zod';

type Resource = {};
type ResourceCreate<T extends Resource> = Partial<T>;

export type CreateViewProps<T extends Resource> = {
  schema?: ZodObject<{ [K in any]: ZodTypeAny }>;
  initialValues?: ResourceCreate<T>;
  onSubmit: (value: T) => Promise<void>;
  label: string;
};

export default function FormModal<T extends Resource>(
  props: PropsWithChildren<CreateViewProps<T>>
) {
  const [isPending, startTransition] = React.useTransition();
  const [opened, { open, close }] = useDisclosure(false);
  const { children, schema, initialValues, label } = props;
  const form = useForm<ResourceCreate<T>>({
    validate: schema && zodResolver(schema),
    initialValues,
  });

  const handleSubmit = async (values: ResourceCreate<T>) => {
    startTransition(async () => {
      await props.onSubmit(values as T);
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title='Authentication'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack py={50} px={70} pb={120} gap={'lg'}>
            {React.Children.map(children, (child: React.ReactNode) => {
              if (!React.isValidElement(child)) return child;
              return React.cloneElement(child as React.ReactElement, {
                ...child.props,
                ...form.getInputProps(child.props.name),
              });
            })}
          </Stack>
          <Button type='submit' loading={isPending}>
            Submit
          </Button>
        </form>
      </Modal>
      <Button onClick={open}>Open modal</Button>
    </>
  );
}
