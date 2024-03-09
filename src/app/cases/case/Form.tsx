'use client';
import ResourceForm from '@/components/ResourceForm';
import { Grid, GridCol, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';

export default function Form() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        size={'xl'}
        opened={opened}
        onClose={close}
        title={'Personal Information'}
      >
        <PersonalInfoForm />
      </Modal>
      <Grid>
        <GridCol span={6}>
          <TextInput name='rciNo' label='RCI No.' placeholder='RCI No.' />
          <TextInput name='obNo' label='OB No.' placeholder='OB No.' />
        </GridCol>
        <GridCol span={6}>
          <TextInput
            name='victim'
            label='Victim'
            component={'button'}
            onClick={open}
            pointer
          />
        </GridCol>
      </Grid>
    </>
  );
}
