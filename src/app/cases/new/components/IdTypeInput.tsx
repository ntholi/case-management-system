import { Chip, Group, Radio, TextInput } from '@mantine/core';
import React, { useState } from 'react';

type Props = {
  onChange: any;
  value?: any;
  checked?: any;
  error?: any;
  onFocus?: any;
  onBlur?: any;
};

type IDType =
  | 'ID Card'
  | 'Divers License'
  | 'Passport'
  | 'Voters Card'
  | 'None'
  | 'Other';

export default function IdTypeInput(props: Props) {
  const [selected, setSelected] = useState<IDType>('ID Card');

  return (
    <Group>
      <Chip.Group
        value={selected}
        multiple={false}
        onChange={(it) => {
          setSelected(it as IDType);
        }}
      >
        <Group mt='xs'>
          <Chip size='xs' value='ID Card'>
            ID Card
          </Chip>
          <Chip size='xs' value='Divers License'>
            Drivers License
          </Chip>
          <Chip size='xs' value='Passport'>
            Passport
          </Chip>
          <Chip size='xs' value='Voters Card'>
            Voters Card
          </Chip>
          <Chip size='xs' value='None'>
            None
          </Chip>
          <Chip size='xs' value='Other'>
            Other
          </Chip>
        </Group>
      </Chip.Group>
      <TextInput
        w={160}
        required
        mt={10}
        {...props}
        disabled={selected !== 'Other'}
        value={selected === 'Other' ? '' : selected}
      />
    </Group>
  );
}
