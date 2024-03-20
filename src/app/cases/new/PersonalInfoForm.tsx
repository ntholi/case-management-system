'use client';
import {
  Button,
  Grid,
  GridCol,
  Group,
  LoadingOverlay,
  Radio,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Gender, PersonalInformation } from '@prisma/client';
import axios from 'axios';
import React, { useEffect } from 'react';
import IdTypeInput from './components/IdTypeInput';
import { DateInput } from '@mantine/dates';

type Props = {
  onSave: (value: PersonalInformation | undefined) => void;
  value?: PersonalInformation;
};

export default function PersonalInfoForm({ onSave, value }: Props) {
  const { setValues, ...form } = useForm<PersonalInformation>({
    validate: {
      nationalIdType: (value) => {
        if (!value) return 'ID Type is required';
      },
    },
  });
  const [lookingUp, setLookingUp] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  useEffect(() => {
    if (value) {
      setValues(value);
    }
  }, [setValues, value]);

  function handleSubmit(
    values: PersonalInformation,
    event: React.FormEvent<HTMLFormElement> | undefined
  ) {
    event?.preventDefault();
    event?.stopPropagation();
    startTransition(async () => {
      const res = await axios.post('/api/personal-info', values);
      onSave(res.data);
    });
  }

  function lookupByNationalId() {
    const nationalId = form.values.nationalId;
    if (nationalId) {
      setLookingUp(true);
      axios
        .get(`/api/personal-info?nationalId=${nationalId}`)
        .then((response) => {
          setValues(response.data);
        })
        .finally(() => {
          setLookingUp(false);
        });
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          onBlurCapture={lookupByNationalId}
          label='ID'
          required
          {...form.getInputProps('nationalId')}
        />
        <IdTypeInput required {...form.getInputProps('nationalIdType')} />
        <Grid pos={'relative'}>
          <LoadingOverlay visible={lookingUp} />
          <GridCol span={6}>
            <TextInput label='Surname' {...form.getInputProps('surname')} />
          </GridCol>
          <GridCol span={6}>
            <TextInput
              label='First Name'
              {...form.getInputProps('firstName')}
            />
          </GridCol>
          <GridCol span={6}>
            <TextInput
              label='Middle Name'
              {...form.getInputProps('middleName')}
            />
          </GridCol>
          <GridCol span={6}>
            <Radio.Group
              mt={'xs'}
              description='Gender'
              {...form.getInputProps('gender')}
            >
              <Group mt='xs'>
                {Object.entries(Gender).map(([key, value]) => (
                  <Radio key={key} value={value} label={value} />
                ))}
              </Group>
            </Radio.Group>
          </GridCol>
          <GridCol span={6}>
            <TextInput
              label='Phone Number'
              {...form.getInputProps('phoneNumber')}
            />
          </GridCol>
          <GridCol span={6}>
            <TextInput
              label='Email'
              type='email'
              {...form.getInputProps('email')}
            />
          </GridCol>
          <GridCol span={6}>
            <DateInput
              label='Date of Birth'
              {...form.getInputProps('dateOfBirth')}
            />
          </GridCol>
          <GridCol span={6}>
            <TextInput
              label='Place of Birth'
              {...form.getInputProps('placeOfBirth')}
            />
          </GridCol>
          <GridCol span={6}>
            <TextInput
              label='Nationality'
              {...form.getInputProps('nationality')}
            />
          </GridCol>
          <GridCol span={6}>
            <TextInput
              label='Occupation'
              {...form.getInputProps('occupation')}
            />
          </GridCol>
        </Grid>
        <Button mt={'xl'} type='submit' loading={isPending}>
          Save
        </Button>
      </Stack>
    </form>
  );
}
