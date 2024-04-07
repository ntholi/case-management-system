'use client';
import { Group, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';

const ranges = [
  { value: 'all', label: 'All' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last-7-days', label: 'Last 7 days' },
  { value: 'last-30-days', label: 'Last 30 days' },
  { value: 'last-90-days', label: 'Last 90 days' },
  { value: 'last-365-days', label: 'Last 365 days' },
];
export default function DateFilter() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [selected, setSelected] = useState(ranges[1].value);
  const [_, setDateFilter] = useQueryState('date');

  useEffect(() => {
    if (value[0] === null && value[1] === null) {
      setDateFilter(null);
    } else {
      setDateFilter(`${value[0]?.toISOString()}..${value[1]?.toISOString()}`);
    }
  }, [setDateFilter, value]);

  function updateSelected(value: string | null) {
    if (value === null) return;
    setSelected(value);
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);

    switch (value) {
      case 'today':
        setValue([start, end]);
        break;
      case 'yesterday':
        start.setDate(now.getDate() - 1);
        end.setDate(now.getDate() - 1);
        setValue([start, end]);
        break;
      case 'last-7-days':
        start.setDate(now.getDate() - 7);
        setValue([start, end]);
        break;
      case 'last-30-days':
        start.setDate(now.getDate() - 30);
        setValue([start, end]);
        break;
      case 'last-90-days':
        start.setDate(now.getDate() - 90);
        setValue([start, end]);
        break;
      case 'last-365-days':
        start.setDate(now.getDate() - 365);
        setValue([start, end]);
        break;
      case 'all':
        setValue([null, null]);
        break;
    }
  }

  return (
    <>
      <Select
        data={ranges.map((range) => ({
          value: range.value,
          label: range.label,
        }))}
        value={selected}
        onChange={updateSelected}
      />
      <DatePickerInput
        type='range'
        placeholder='Pick dates range'
        value={value}
        onChange={setValue}
        w={250}
      />
    </>
  );
}
