'use client';
import ResourceForm from '@/components/ResourceForm';
import { Grid, GridCol, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';

export type ReferenceType = {
  id: string;
  label: string;
};

export default function Form() {
  const [opened, { open, close }] = useDisclosure(false);
  const [victim, setVictim] = React.useState<ReferenceType | null>(null);

  return (
    <>
      <Modal
        size={'xl'}
        opened={opened}
        onClose={close}
        title={'Personal Information'}
      >
        <PersonalInfoForm setValue={setVictim} />
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
            value={victim?.label}
            component={'button'}
            onClick={open}
            pointer
          />
        </GridCol>
      </Grid>
    </>
  );
}
