'use client';
import {
  Button,
  Fieldset,
  Flex,
  Grid,
  GridCol,
  Group,
  MultiSelect,
  Radio,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

import { useForm } from '@mantine/form';
import {
  Case as BaseCase,
  CrimeClassification,
  ModusOperandiLined,
  PersonalInformation,
  PoliceStation,
  Weapon,
} from '@prisma/client';
import { IconDeviceFloppy } from '@tabler/icons-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import PersonalInfoInput from './PersonalInfoInput';

type Case = BaseCase & {
  weapons: Weapon[];
  weaponIds?: string[];
  crimeClassifications: CrimeClassification[];
  crimeClassificationIds?: string[];
  policeStation: PoliceStation;
  suspects: PersonalInformation[];
  victims: PersonalInformation[];
  reportingPerson: PersonalInformation;
};
type Props = {
  item?: Case;
  weapons?: Weapon[];
  policeStations?: PoliceStation[];
  crimeClassifications?: CrimeClassification[];
};

export default function Form({
  item,
  weapons,
  crimeClassifications,
  policeStations,
}: Props) {
  const [victims, setVictims] = React.useState<PersonalInformation[]>(
    item?.victims || []
  );
  const [suspects, setSuspects] = React.useState<PersonalInformation[]>(
    item?.suspects || []
  );
  const { setValues, setFieldValue, ...form } = useForm<Partial<Case>>({
    initialValues: item
      ? {
          ...item,
          weaponIds: item?.weapons?.map((it) => it.id),
          crimeClassificationIds: item?.crimeClassifications?.map(
            (it) => it.id
          ),
        }
      : {
          dateOfReport: new Date(),
        },
    validate: {
      policeStationId: (value) => {
        if (!value) return 'Police Station is required';
        return undefined;
      },
      dateOfReport: (value, values) => {
        if (
          values.dateOfOccurrence &&
          value &&
          value < values.dateOfOccurrence
        ) {
          return 'Date of report cannot be before date of occurrence';
        }
        return undefined;
      },
    },
  });
  const { setValues: setReportingPerson, ...reportingPersonForm } =
    useForm<Case>({});
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  function handleSubmit(values: Partial<Case>) {
    if (values.occurrencePlace) {
      values.occurrencePlace = values.occurrencePlace.trim();
    }
    startTransition(async () => {
      const obj = {
        ...values,
        victimIds: victims?.map((it) => it.id),
        suspectIds: suspects?.map((it) => it.id),
        reportingPerson: reportingPersonForm.values,
      };
      console.log({ item });
      if (item) {
        await axios.put(`/api/cases/${obj.id}`, obj);
      } else {
        await axios.post('/api/cases', obj);
      }
      router.push('/cases');
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid>
        <GridCol span={6}>
          <TextInput
            label='RCI No.'
            {...form.getInputProps('rciNo')}
            required
          />
        </GridCol>
        <GridCol span={6}>
          <TextInput label='OB No.' {...form.getInputProps('obNo')} required />
        </GridCol>
        <GridCol span={6}>
          <PersonalInfoInput
            title='Victims'
            items={victims}
            setItems={setVictims}
          />
        </GridCol>
        <GridCol span={6}>
          <PersonalInfoInput
            title='Suspect'
            items={suspects}
            setItems={setSuspects}
          />
        </GridCol>
        <GridCol span={12}>
          <TextInput
            label='Relationship'
            description='Relationship between suspect and victim'
            {...form.getInputProps('suspectVictimRelationship')}
          />
        </GridCol>
        <GridCol span={6}>
          <MultiSelect
            label='Crime Classifications'
            {...form.getInputProps('crimeClassificationIds')}
            data={
              crimeClassifications?.map((it) => ({
                value: it.id,
                label: it.name,
              })) || []
            }
          />
        </GridCol>

        <GridCol span={6}>
          <MultiSelect
            label='Weapons Used'
            {...form.getInputProps('weaponIds')}
            data={
              weapons?.map((it) => ({ value: it.id, label: it.name })) || []
            }
          />
        </GridCol>
        <GridCol span={6}>
          <DateTimePicker
            label='Date of Occurrence'
            {...form.getInputProps('dateOfOccurrence')}
          />
        </GridCol>
        <GridCol span={6}>
          <DateTimePicker
            label='Date of Report'
            {...form.getInputProps('dateOfReport')}
          />
        </GridCol>
        <GridCol span={6}>
          <TextInput
            label='Occurrence Place'
            {...form.getInputProps('occurrencePlace')}
          />
        </GridCol>
        <GridCol span={6}>
          <Select
            label='Police Station'
            required
            {...form.getInputProps('policeStationId')}
            data={
              policeStations?.map((it) => ({
                value: it.id,
                label: `${it.name} (${it.district})`,
              })) || []
            }
          />
        </GridCol>
      </Grid>
      <Grid mt={'lg'}>
        <GridCol span={6}>
          <Textarea
            rows={6}
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
            label='Contributing Factor'
            {...form.getInputProps('contributingFactor')}
          />
        </GridCol>

        <GridCol span={12}>
          <Textarea
            label='Damaged Property'
            description='Describe the property that was damaged.'
            {...form.getInputProps('damagedProperty')}
          />
        </GridCol>
        <GridCol span={12}>
          <Textarea
            description='Give a detailed explanation of what occurred.'
            rows={7}
            label='What Happened?'
            {...form.getInputProps('whatHappened')}
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

      <Flex justify={'flex-end'}>
        <Button
          mt={'lg'}
          type='submit'
          w={220}
          loading={isPending}
          leftSection={<IconDeviceFloppy />}
        >
          Save
        </Button>
      </Flex>
    </form>
  );
}
