import ThemedButton from '@/components/ThemedButton';
import prisma from '@/lib/prisma';
import { Paper, Table } from '@mantine/core';

export default function CasePage() {
  const cases = prisma.case.findMany();
  return (
    <>
      <Paper p='md' withBorder>
        <ThemedButton>New</ThemedButton>
      </Paper>
      <Table></Table>
    </>
  );
}
