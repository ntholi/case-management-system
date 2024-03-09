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
import { Gender, NationalIdType, PersonalInformation } from '@prisma/client';
import axios from 'axios';
import React from 'react';
import { ReferenceType } from './Form';

type Props = {
  setValue: (value: ReferenceType | null) => void;
};

export default function PersonalInfoForm({ setValue }: Props) {
  const form = useForm<PersonalInformation>({});
  const [lookingUp, setLookingUp] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(values: PersonalInformation) {
    startTransition(async () => {
      await axios.post('/api/personal-info', values);
      setValue({
        id: values.nationalId,
        label: `${values.firstName} ${values.surname}`,
      });
    });
  }

  function lookupByNationalId() {
    const nationalId = form.values.nationalId;
    if (nationalId) {
      setLookingUp(true);
      axios
        .get(`/api/personal-info?nationalId=${nationalId}`)
        .then((response) => {
          console.log(response.data);
          form.setValues(response.data);
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
        <Radio.Group
          description='ID Type'
          {...form.getInputProps('nationalIdType')}
        >
          <Group mt='xs'>
            {Object.entries(NationalIdType).map(([key, value]) => (
              <Radio key={key} value={value} label={value} />
            ))}
          </Group>
        </Radio.Group>
        <Grid pos={'relative'}>
          <LoadingOverlay visible={lookingUp} />
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
              {/* <DateInput
                label='Date of Birth'
                {...form.getInputProps('dateOfBirth')}
              /> */}
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
        <Button mt={'xl'} type='submit' loading={isPending}>
          Save
        </Button>
      </Stack>
    </form>
  );
}
