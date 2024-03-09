'use client';
import {
  Button,
  Chip,
  Grid,
  GridCol,
  Group,
  Radio,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Gender, NationalIdType, PersonalInformation } from '@prisma/client';
import React from 'react';
import { DateInput } from '@mantine/dates';

export default function PersonalInfoForm() {
  const form = useForm<PersonalInformation>({});

  function handleSubmit(values: PersonalInformation) {
    console.log(values);
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Grid>
          <GridCol span={12}>
            <TextInput label='ID' {...form.getInputProps('nationalId')} />
            <Radio.Group
              mt={'sm'}
              description='ID Type'
              {...form.getInputProps('nationalIdType')}
            >
              <Group mt='xs'>
                {Object.entries(NationalIdType).map(([key, value]) => (
                  <Radio key={key} value={value} label={value} />
                ))}
              </Group>
            </Radio.Group>
          </GridCol>
          <GridCol span={6}>
            <Stack gap={'sm'}>
              <TextInput label='Surname' {...form.getInputProps('surname')} />
              <TextInput
                label='Middle Name'
                {...form.getInputProps('middleName')}
              />
              <TextInput
                label='Phone Number'
                {...form.getInputProps('phoneNumber')}
              />
              <DateInput
                label='Date of Birth'
                {...form.getInputProps('dateOfBirth')}
              />
              <TextInput
                label='Nationality'
                {...form.getInputProps('nationality')}
              />
            </Stack>
          </GridCol>
          <GridCol span={6}>
            <Stack gap={'sm'}>
              <TextInput
                label='First Name'
                {...form.getInputProps('firstName')}
              />
              <Radio.Group
                mt={'sm'}
                description='Gender'
                {...form.getInputProps('gender')}
              >
                <Group mt='xs'>
                  {Object.entries(Gender).map(([key, value]) => (
                    <Radio key={key} value={value} label={value} />
                  ))}
                </Group>
              </Radio.Group>
              <TextInput
                label='Email'
                type='email'
                mt={5}
                {...form.getInputProps('email')}
              />
              <TextInput
                label='Place of Birth'
                {...form.getInputProps('placeOfBirth')}
              />
              <TextInput
                label='Occupation'
                {...form.getInputProps('occupation')}
              />
            </Stack>
          </GridCol>
        </Grid>
        <Button mt={'xl'} type='submit'>
          Save
        </Button>
      </Stack>
    </form>
  );
}
