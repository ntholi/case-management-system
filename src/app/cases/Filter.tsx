'use client';
import {
  Box,
  Button,
  Loader,
  Modal,
  NativeSelect,
  Select,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CrimeClassification, PoliceStation, Weapon } from '@prisma/client';
import { IconPlus } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';

type Filter = {
  type: string;
  value: string | number | null;
};

export default function Filter() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = React.useState('Weapon');
  const [component, setComponent] = useState<React.ReactNode | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>();
  const [filter, setFilter] = useQueryState('filter');

  useEffect(() => {
    switch (selected) {
      case 'Weapon':
        setComponent(<WeaponFilter setFilter={setSelectedFilter} />);
        break;
      case 'Classification':
        setComponent(<ClassificationFilter setFilter={setSelectedFilter} />);
        break;
      case 'Station':
        setComponent(<StationFilter setFilter={setSelectedFilter} />);
        break;
    }
  }, [selected]);

  function applyFilter() {
    setFilter(`${selectedFilter?.type}:${selectedFilter?.value}`);
    close();
  }

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Stack>
          <NativeSelect
            label='Filter By'
            data={['Weapon', 'Classification', 'Station']}
            value={selected}
            onChange={(event) => setSelected(event.currentTarget.value)}
          />
          {component && component}
          <Button onClick={applyFilter}>Apply</Button>
        </Stack>
      </Modal>
      <Box>
        <Button
          size='sm'
          variant='light'
          onClick={open}
          rightSection={<IconPlus size={'1rem'} />}
        >
          Add Filter
        </Button>
      </Box>
    </>
  );
}
type FilterProps = {
  setFilter: (value: Filter | null) => void;
};

function StationFilter({ setFilter }: FilterProps) {
  const [items, setItems] = useState<PoliceStation[]>([]);
  const [isLoading, setLoading] = useState(true);

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
      rightSection={isLoading && <Loader size={'xs'} />}
      onChange={(it) => setFilter({ type: 'station', value: it })}
      data={
        items?.map((it) => ({
          value: it.id,
          label: `${it.name} (${it.district})`,
        })) || []
      }
    />
  );
}

function ClassificationFilter({ setFilter }: FilterProps) {
  const [items, setItems] = useState<CrimeClassification[]>([]);
  const [isLoading, setLoading] = useState(true);

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
      onChange={(it) => setFilter({ type: 'station', value: it })}
      disabled={isLoading}
      rightSection={isLoading && <Loader size={'xs'} />}
      data={items?.map((it) => ({ value: it.id, label: it.name })) || []}
    />
  );
}

function WeaponFilter({ setFilter }: FilterProps) {
  const [items, setItems] = useState<Weapon[]>([]);
  const [isLoading, setLoading] = useState(true);

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
      onChange={(it) => setFilter({ type: 'station', value: it })}
      disabled={isLoading}
      rightSection={isLoading && <Loader size={'xs'} />}
      data={items?.map((it) => ({ value: it.id, label: it.name })) || []}
    />
  );
}
