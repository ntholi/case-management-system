import { Chip, Group, Radio, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';

type Props = {
  onChange: any;
  value?: any;
  checked?: any;
  error?: any;
  onFocus?: any;
  onBlur?: any;
};

const IdOptions = [
  'ID Card',
  'Drivers License',
  'Passport',
  'Voters Card',
  'None',
  'Other',
];
type IDType = (typeof IdOptions)[number];

export default function IdTypeInput(props: Props) {
  const [selected, setSelected] = useState<IDType>('ID Card');
  const { value, onChange } = props;

  useEffect(() => {
    const notOther = IdOptions.filter((it) => it !== 'Other');
    if (notOther.includes(value)) {
      setSelected(value);
    } else {
      // setSelected('Other');
    }
  }, [value]);

  return (
    <Group>
      <Chip.Group
        value={selected}
        multiple={false}
        onChange={(it) => {
          setSelected(it as IDType);
          if (it === 'Other') {
            onChange('');
          } else onChange(it);
        }}
      >
        <Group mt='xs'>
          <Chip size='xs' value='ID Card'>
            ID Card
          </Chip>
          <Chip size='xs' value='Drivers License'>
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
      />
    </Group>
  );
}
