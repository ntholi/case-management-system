'use client';
import PageTitle from '@/components/PageTitle';
import ThemedTableHead from '@/components/ThemedTableHead';
import { dateTime } from '@/lib/format';
import {
  Anchor,
  Button,
  Divider,
  Flex,
  Group,
  Loader,
  Paper,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableTr,
} from '@mantine/core';
import {
  Case as BaseCase,
  CrimeClassification,
  PersonalInformation,
} from '@prisma/client';
import { IconFileSpreadsheet } from '@tabler/icons-react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import Filter, { Filters } from './Filter';
import { exportToExcel } from './export';
import { calculateAge } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export type Case = BaseCase & {
  victim?: PersonalInformation;
  suspect?: PersonalInformation;
  classification?: CrimeClassification;
};

export default function CasePage() {
  const [data, setData] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [weapon] = useQueryState(Filters.weapon);
  const [classification] = useQueryState(Filters.classification);
  const [station] = useQueryState(Filters.station);

  useEffect(() => {
    const filter = new URLSearchParams();
    if (weapon) filter.set(Filters.weapon, weapon);
    if (classification) filter.set(Filters.classification, classification);
    if (station) filter.set(Filters.station, station.split(':')[0]);

    async function fetchData() {
      const response = await fetch(`/api/cases?${filter}`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [weapon, classification, station]);

  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{row.obNo}</TableTd>
      <TableTd>{row.rciNo}</TableTd>
      <TableTd>
        {row.victim?.firstName} {row.victim?.surname}
      </TableTd>
      <TableTd>
        {row.suspect?.firstName} {row.suspect?.surname}
      </TableTd>
      <TableTd>{calculateAge(row.suspect?.dateOfBirth)}</TableTd>
      <TableTd>{dateTime(row.dateOfOccurrence)} </TableTd>
      <TableTd>{row.classification?.name}</TableTd>
      <TableTd>{row.suspectVictimRelationship}</TableTd>
      <TableTd align='right'>
        <Group gap={1} justify='end'>
          <Anchor mr={'lg'} href={`/cases/${row.id}`} component={Link}>
            View
          </Anchor>
        </Group>
      </TableTd>
    </TableTr>
  ));

  if (loading)
    return (
      <Flex w={'100%'} justify={'center'} mt={250}>
        <Loader />
      </Flex>
    );

  return (
    <>
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <Group>
            <PageTitle text='Cases' />
            <Divider orientation='vertical' />
            <Filter />
          </Group>
          <Group>
            <Button
              variant='light'
              onClick={() => exportToExcel(data)}
              leftSection={<IconFileSpreadsheet size={'1rem'} />}
            >
              Export
            </Button>
          </Group>
        </Flex>
      </Paper>
      <Table withTableBorder mt={'lg'}>
        <ThemedTableHead>
          <TableTr>
            <TableTh>RCI No.</TableTh>
            <TableTh>OB No.</TableTh>
            <TableTh>Victim</TableTh>
            <TableTh>Suspect</TableTh>
            <TableTh>Age</TableTh>
            <TableTh>Date of Occurrence</TableTh>
            <TableTh>Classification</TableTh>
            <TableTh>Victim/Suspect Relationship</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </ThemedTableHead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </>
  );
}
