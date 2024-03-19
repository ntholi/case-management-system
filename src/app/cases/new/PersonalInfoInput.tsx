import { PillsInput, Pill, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import classes from './PersonalInfoInput.module.css';
import { PersonalInformation } from '@prisma/client';
import PersonalInfoForm from './PersonalInfoForm';

type Props = {
  title: string;
  items: PersonalInformation[];
  setItems: React.Dispatch<React.SetStateAction<PersonalInformation[]>>;
};

export default function PersonalInfoInput(props: Props) {
  const { title, items, setItems } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [current, setCurrent] = useState<PersonalInformation>();

  const handleValueRemove = (val: PersonalInformation) =>
    setItems((current) => current.filter((v) => v.id !== val.id));

  const values = items.map((item) => (
    <Pill
      key={item.id}
      withRemoveButton
      classNames={{
        remove: classes.remove,
      }}
      onRemove={() => handleValueRemove(item)}
    >
      <Text
        size={'xs'}
        mt={2}
        className={classes.pillText}
        onClick={() => {
          setCurrent(item);
          open();
        }}
      >
        {item.firstName} {item.surname}
      </Text>
    </Pill>
  ));

  return (
    <>
      <Modal size={'xl'} opened={opened} onClose={close} title={title}>
        <PersonalInfoForm
          value={current}
          onSave={(it) => {
            setCurrent(it);
            if (it) {
              const allButCurrent = items.filter((i) => i.id !== it.id);
              setItems([...allButCurrent, it]);
            }
            close();
          }}
        />
      </Modal>
      <PillsInput label={title}>
        <Pill.Group>
          {values}
          <PillsInput.Field
            pointer
            onClick={() => {
              setCurrent(undefined);
              open();
            }}
          />
        </Pill.Group>
      </PillsInput>
    </>
  );
}
