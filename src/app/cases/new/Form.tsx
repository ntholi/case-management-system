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
import { DateTimePicker } from '@mantine/dates';

import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import {
  Case,
  CrimeClassification,
  District,
  ModusOperandiLined,
  PersonalInformation,
  PoliceStation,
  Weapon,
} from '@prisma/client';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
  weapons?: Weapon[];
  policeStations?: PoliceStation[];
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
  const { setValues: setReportingPerson, ...reportingPersonForm } =
    useForm<Case>({});
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  function handleSubmit(values: Case) {
    if (victim) values.victimId = victim.id;
    if (suspect) values.suspectId = suspect.id;
    if (values.occurrencePlace) {
      values.occurrencePlace = values.occurrencePlace.trim();
    }
    startTransition(async () => {
      await axios.post('/api/cases', {
        ...values,
        reportingPerson: reportingPersonForm.values,
      });
      router.push('/cases');
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
              <TextInput
                label='RCI No.'
                {...form.getInputProps('rciNo')}
                required
              />
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
              <DateTimePicker
                label='Date of Occurrence'
                {...form.getInputProps('dateOfOccurrence')}
              />
              <TextInput
                label='Occurrence Place'
                {...form.getInputProps('occurrencePlace')}
              />
            </Stack>
          </GridCol>
          <GridCol span={6}>
            <Stack gap={'sm'}>
              <TextInput
                label='OB No.'
                {...form.getInputProps('obNo')}
                required
              />
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
              <DateTimePicker
                label='Date of Report'
                {...form.getInputProps('dateOfReport')}
              />
              <Select
                label='Police Station'
                {...form.getInputProps('policeStationId')}
                data={
                  weapons?.map((it) => ({ value: it.id, label: it.name })) || []
                }
              />
            </Stack>
          </GridCol>
        </Grid>
        <Grid>
          <GridCol span={6}>
            <Textarea
              rows={5}
              label='Modus Operandi'
              {...form.getInputProps('modusOperandi')}
            />
          </GridCol>
          <GridCol span={6}>
            <Radio.Group
              mt={'lg'}
              description='Does Modus Operandi Contributed to Crime?'
              {...form.getInputProps('nationalIdType')}
            >
              <Group mt='xs'>
                {Object.entries(ModusOperandiLined).map(([key, value]) => (
                  <Radio key={key} value={value} label={value} />
                ))}
              </Group>
            </Radio.Group>
            <Textarea
              cols={3}
              mt={'md'}
              placeholder='How Modus Operandi Contributed to Crime?'
              {...form.getInputProps('modusOperandiDetails')}
            />
          </GridCol>
        </Grid>

        <Fieldset mt={'lg'} legend='Reporting Person'>
          <Grid>
            <GridCol span={6}>
              <TextInput
                label='Name'
                {...reportingPersonForm.getInputProps('name')}
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                label='ID'
                {...reportingPersonForm.getInputProps('idNo')}
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                label='Phone Number'
                {...reportingPersonForm.getInputProps('phoneNumber')}
              />
            </GridCol>
            <GridCol span={6}>
              <TextInput
                label='Relationship'
                {...reportingPersonForm.getInputProps('relationship')}
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
