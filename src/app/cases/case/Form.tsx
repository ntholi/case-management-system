'use client';
import {
  Button,
  Fieldset,
  Grid,
  GridCol,
  Group,
  Modal,
  Radio,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import {
  Case,
  CrimeClassification,
  ModusOperandiLined,
  PersonalInformation,
  Weapon,
} from '@prisma/client';
import { useForm } from '@mantine/form';
import axios from 'axios';

type Props = {
  weapons?: Weapon[];
  crimeClassifications?: CrimeClassification[];
};

export default function Form({ weapons, crimeClassifications }: Props) {
  const [victimOpened, { open: openVictim, close: closeVictim }] =
    useDisclosure(false);
  const [suspectOpened, { open: openSuspect, close: closeSuspect }] =
    useDisclosure(false);
  const [victim, setVictim] = React.useState<PersonalInformation>();
  const [suspect, setSuspect] = React.useState<PersonalInformation>();
  const { setValues, ...form } = useForm<Case>({});
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(values: Case) {
    if (victim) values.victimId = victim.id;
    if (suspect) values.suspectId = suspect.id;
    if (values.occurrencePlace) {
      values.occurrencePlace = values.occurrencePlace.trim();
    }
    startTransition(async () => {
      await axios.post('/api/cases', values);
    });
  }

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

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <GridCol span={6}>
            <Stack gap={'sm'}>
              <TextInput label='RCI No.' {...form.getInputProps('rciNo')} />
              <TextInput
                label='Victim'
                value={`${victim?.firstName || ''} ${victim?.surname || ''}`}
                onClick={openVictim}
                pointer
              />
              <Select
                label='Classification'
                {...form.getInputProps('classificationId')}
                data={
                  crimeClassifications?.map((it) => ({
                    value: it.id,
                    label: it.name,
                  })) || []
                }
              />
              <TextInput
                label='Occurrence Place'
                {...form.getInputProps('occurrencePlace')}
              />
            </Stack>
          </GridCol>
          <GridCol span={6}>
            <Stack gap={'sm'}>
              <TextInput label='OB No.' {...form.getInputProps('obNo')} />
              <TextInput
                label='Suspect'
                value={`${suspect?.firstName || ''} ${suspect?.surname || ''}`}
                onClick={openSuspect}
                pointer
              />
              <Select
                label='Weapon Used'
                {...form.getInputProps('weaponId')}
                data={
                  weapons?.map((it) => ({ value: it.id, label: it.name })) || []
                }
              />
            </Stack>
          </GridCol>
        </Grid>
        <Fieldset legend='Modus Operandi' mt={'md'}>
          <Grid>
            <GridCol span={6}>
              <Textarea
                rows={5}
                placeholder='Modus Operandi'
                {...form.getInputProps('modusOperandi')}
              />
            </GridCol>
            <GridCol span={6}>
              <Radio.Group
                description='Does Modus Operandi Contributed to Crime?'
                {...form.getInputProps('nationalIdType')}
              >
                <Group mt='xs'>
                  {Object.entries(ModusOperandiLined).map(([key, value]) => (
                    <Radio key={key} value={value} label={value} />
                  ))}
                </Group>
              </Radio.Group>
              <TextInput
                mt={'md'}
                placeholder='How Modus Operandi Contributed to Crime?'
                {...form.getInputProps('modusOperandiDetails')}
              />
            </GridCol>
          </Grid>
        </Fieldset>

        <Button mt={'lg'} type='submit' loading={isPending}>
          Save
        </Button>
      </form>
    </>
  );
}
