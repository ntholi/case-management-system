import { PillsInput, Pill, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';

type Props = {
  title?: string;
};

export default function PersonalInfoInput(props: Props) {
  const { title } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<string[]>(['Thabo', 'Lebese']);

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      <Text
        size={'xs'}
        mt={2}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          console.log('Clicked');
        }}
      >
        {item}
      </Text>
    </Pill>
  ));

  return (
    <>
      <Modal
        size={'xl'}
        opened={opened}
        onClose={close}
        title={title ? title : 'Personal Information'}
      >
        {/* <PersonalInfoForm
          value={victim}
          onSave={(it) => {
            setVictim(it);
            closeVictim();
          }}
        /> */}
      </Modal>
      <PillsInput label='PillsInput'>
        <Pill.Group>
          {values}
          <PillsInput.Field placeholder='Enter tags' pointer />
        </Pill.Group>
      </PillsInput>
    </>
  );
}
