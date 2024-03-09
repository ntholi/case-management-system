'use client';
import ResourceForm from '@/components/ResourceForm';
import { Grid, GridCol, Modal, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import { PersonalInformation } from '@prisma/client';

export type ReferenceType = {
  id: string;
  label: string;
};

export default function Form() {
  const [victimOpened, { open: openVictim, close: closeVictim }] =
    useDisclosure(false);
  const [suspectOpened, { open: openSuspect, close: closeSuspect }] =
    useDisclosure(false);
  const [victim, setVictim] = React.useState<PersonalInformation>();
  const [suspect, setSuspect] = React.useState<PersonalInformation>();

  return (
    <>
      <Modal
        size={'xl'}
        opened={victimOpened}
        onClose={closeVictim}
        title={'Personal Information'}
      >
        <PersonalInfoForm
          value={victim}
          onSave={(it) => {
            setVictim(it);
            closeVictim();
          }}
        />
      </Modal>

      <Modal
        size={'xl'}
        opened={suspectOpened}
        onClose={closeSuspect}
        title={'Personal Information'}
      >
        <PersonalInfoForm
          value={suspect}
          onSave={(it) => {
            setSuspect(it);
            closeSuspect();
          }}
        />
      </Modal>

      <Grid>
        <GridCol span={6}>
          <Stack gap={'sm'}>
            <TextInput name='rciNo' label='RCI No.' placeholder='RCI No.' />
            <TextInput
              label='Victim'
              value={`${victim?.firstName || ''} ${victim?.surname || ''}`}
              onClick={openVictim}
              pointer
            />
          </Stack>
        </GridCol>
        <GridCol span={6}>
          <Stack gap={'sm'}>
            <TextInput name='obNo' label='OB No.' placeholder='OB No.' />
            <TextInput
              label='Suspect'
              value={`${suspect?.firstName || ''} ${suspect?.surname || ''}`}
              onClick={openSuspect}
              pointer
            />
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
}
