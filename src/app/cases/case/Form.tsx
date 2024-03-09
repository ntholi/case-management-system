'use client';
import ResourceForm from '@/components/ResourceForm';
import { Grid, GridCol, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import { PersonalInformation } from '@prisma/client';

export type ReferenceType = {
  id: string;
  label: string;
};

export default function Form() {
  const [opened, { open, close }] = useDisclosure(false);
  const [victim, setVictim] = React.useState<PersonalInformation>();

  return (
    <>
      <Modal
        size={'xl'}
        opened={opened}
        onClose={close}
        title={'Personal Information'}
      >
        <PersonalInfoForm
          value={victim}
          onSave={(it) => {
            setVictim(it);
            close();
          }}
        />
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
            value={`${victim?.firstName || ''} ${victim?.surname || ''}`}
            onClick={open}
            pointer
          />
        </GridCol>
      </Grid>
    </>
  );
}
