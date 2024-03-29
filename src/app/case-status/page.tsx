'use client';
import DeleteIconButton from '@/components/DeleteIconButton';
import PageTitle from '@/components/PageTitle';
import ThemedTableHead from '@/components/ThemedTableHead';
import UpdateIconButton from '@/components/UpdateIconButton';
import {
  Anchor,
  Flex,
  Group,
  Loader,
  Modal,
  Paper,
  Select,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableTr,
} from '@mantine/core';
import {
  CaseStatus as BaseCaseStatus,
  Case,
  CourtCaseStatus,
  PoliceCaseStatus,
} from '@prisma/client';
import Link from 'next/link';
import Filter from './Filter';
import { remove, update } from './actions';
import { useEffect, useState } from 'react';
import { useQueryState } from 'nuqs';
import Form from './Form';
import { useDisclosure } from '@mantine/hooks';
import ThemedIconButton from '@/components/ThemedIconButton';
import { IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export type CaseStatus = BaseCaseStatus & {
  case: Case;
};
export default function CasePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const [selected, setSelected] = useState<CaseStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CaseStatus[]>([]);
  const [rciNo] = useQueryState('rciNo');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/case-status?rciNo=${rciNo}`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [rciNo]);

  const rows = data.map((row) => (
    <TableTr key={row.id}>
      <TableTd>
        <Anchor component={Link} href={`/cases/${row.case.id}`}>
          {row.case.rciNo}
        </Anchor>
      </TableTd>
      <TableTd>{row.policeCaseStatus}</TableTd>
      <TableTd>{row.courtCaseStatus}</TableTd>
      <TableTd align='right'>
        <ThemedIconButton
          onClick={() => {
            setSelected(row);
            open();
          }}
        >
          <IconEdit size={'1rem'} />
        </ThemedIconButton>
        <DeleteIconButton ml={10} id={row.id} action={remove} />
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
      {selected && (
        <Modal opened={opened} onClose={close} title={'Case Management'}>
          <Form
            caseStatus={selected}
            onClose={() => {
              close();
              router.refresh();
            }}
          />
        </Modal>
      )}
      <Paper p='md' withBorder>
        <Flex justify={'space-between'} align={'center'}>
          <Group>
            <PageTitle text='Case Management' />
            <Filter />
          </Group>
        </Flex>
      </Paper>
      <Table withTableBorder mt={'lg'}>
        <ThemedTableHead>
          <TableTr>
            <TableTh>Case</TableTh>
            <TableTh>Police Case Status</TableTh>
            <TableTh>Court Case Status</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </ThemedTableHead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </>
  );
}
