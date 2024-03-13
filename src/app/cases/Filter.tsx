'use client';
import {
  Button,
  Group,
  Loader,
  Modal,
  NativeSelect,
  Paper,
  Select,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CrimeClassification, PoliceStation, Weapon } from '@prisma/client';
import { IconFilter } from '@tabler/icons-react';
import axios from 'axios';
import { useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';
import FiltersDisplay from './FiltersDisplay';

export const Filters = {
  station: 'station',
  classification: 'classification',
  weapon: 'weapon',
};

type Filter = {
  type: string;
  value: string | number | null;
};

export default function Filter() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = React.useState('Weapon');
  const [component, setComponent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    switch (selected) {
      case 'Weapon':
        setComponent(<WeaponFilter close={close} />);
        break;
      case 'Classification':
        setComponent(<ClassificationFilter close={close} />);
        break;
      case 'Station':
        setComponent(<StationFilter close={close} />);
        break;
    }
  }, [selected, close]);

  return (
    <>
      <Modal opened={opened} onClose={close} title='Filter'>
        <Stack pb={'xl'}>
          <NativeSelect
            label='Filter By'
            data={['Weapon', 'Classification', 'Station']}
            value={selected}
            onChange={(event) => setSelected(event.currentTarget.value)}
          />
          {component && component}
        </Stack>
      </Modal>
      <Paper withBorder p={3}>
        <Group>
          <Button
            size='sm'
            variant='subtle'
            onClick={open}
            rightSection={<IconFilter size={'1rem'} />}
          >
            Filter
          </Button>
          <FiltersDisplay />
        </Group>
      </Paper>
    </>
  );
}

function StationFilter({ close }: { close: () => void }) {
  const [items, setItems] = useState<PoliceStation[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [_, setValue] = useQueryState(Filters.station);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get('/api/police-stations')
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      label='Police Station'
      disabled={isLoading}
      onChange={(it) => {
        setValue(it);
        close();
      }}
      rightSection={isLoading && <Loader size={'xs'} />}
      data={
        items?.map((it) => ({
          value: it.id,
          label: `${it.name} (${it.district})`,
        })) || []
      }
    />
  );
}

function ClassificationFilter({ close }: { close: () => void }) {
  const [items, setItems] = useState<CrimeClassification[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [_, setValue] = useQueryState(Filters.classification);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get('/api/crime-classifications')
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      label='Classification'
      disabled={isLoading}
      onChange={(it) => {
        setValue(it);
        close();
      }}
      rightSection={isLoading && <Loader size={'xs'} />}
      data={items?.map((it) => ({ value: it.id, label: it.name })) || []}
    />
  );
}

function WeaponFilter({ close }: { close: () => void }) {
  const [items, setItems] = useState<Weapon[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [_, setValue] = useQueryState(Filters.weapon);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get('/api/weapons')
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Select
      label='Weapon'
      disabled={isLoading}
      onChange={(it) => {
        setValue(it);
        close();
      }}
      rightSection={isLoading && <Loader size={'xs'} />}
      data={items?.map((it) => ({ value: it.id, label: it.name })) || []}
    />
  );
}
