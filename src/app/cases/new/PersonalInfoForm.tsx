'use client';
import {
  Button,
  Grid,
  GridCol,
  Group,
  LoadingOverlay,
  Radio,
  Select,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { Education, Gender, PersonalInformation } from '@prisma/client';
import { IconDeviceFloppy } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect } from 'react';
import IdTypeInput from './components/IdTypeInput';

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
      const data = {
        ...res.data,
        dateOfBirth: res?.data?.dateOfBirth
          ? new Date(res?.data?.dateOfBirth)
          : null,
      };
      onSave(data);
    });
  }

  function lookupByNationalId() {
    const nationalId = form.values.nationalId;
    if (nationalId) {
      setLookingUp(true);
      axios
        .get(`/api/personal-info?nationalId=${nationalId}`)
        .then((response) => {
          const data = {
            ...response.data,
            dateOfBirth: response?.data?.dateOfBirth
              ? new Date(response?.data?.dateOfBirth)
              : null,
          };
          setValues(data);
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
          {...form.getInputProps('nationalId')}
        />
        <IdTypeInput required {...form.getInputProps('nationalIdType')} />
        <Grid pos={'relative'}>
          <LoadingOverlay visible={lookingUp} />
          <GridCol span={6}>
            <TextInput
              label='First Name'
              {...form.getInputProps('firstName')}
            />
          </GridCol>
          <GridCol span={6}>
            <TextInput label='Surname' {...form.getInputProps('surname')} />
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
            <Select
              label='Education'
              {...form.getInputProps('education')}
              data={Object.entries(Education).map(([key, value]) => ({
                value: value,
                label: value,
              }))}
            />
          </GridCol>
          <GridCol span={6}>
            <TextInput
              label='Occupation'
              {...form.getInputProps('occupation')}
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
              label='Disability'
              {...form.getInputProps('disability')}
            />
          </GridCol>
          <GridCol span={6}>
            <Textarea
              label='Physical Address'
              {...form.getInputProps('physicalAddress')}
            />
          </GridCol>
          <GridCol span={6}>
            <TextInput
              label='Village Chief'
              {...form.getInputProps('villageChief')}
            />
          </GridCol>
        </Grid>
        <Grid>
          <GridCol span={12}>
            <Textarea
              rows={5}
              description={`Provide a brief description or unique identifiers for this person.`}
              label='Description'
              {...form.getInputProps('description')}
            />
          </GridCol>
        </Grid>
        <Button
          mt={'lg'}
          type='submit'
          w={'100%'}
          loading={isPending}
          leftSection={<IconDeviceFloppy />}
        >
          Save
        </Button>
      </Stack>
    </form>
  );
}
