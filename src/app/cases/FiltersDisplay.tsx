'use client';
import React from 'react';
import { Filters } from './Filter';
import { useQueryState } from 'nuqs';
import { InputBase, Pill } from '@mantine/core';

export default function FiltersDisplay() {
  const [station, setStation] = useQueryState(Filters.station);
  const [classification, setClassification] = useQueryState(
    Filters.classification
  );
  const [weapon, setWeapon] = useQueryState(Filters.weapon);

  const show = station || classification || weapon;

  return (
    show && (
      <InputBase component='div'>
        <Pill.Group mt={7}>
          {station && (
            <Pill onRemove={() => setStation(null)} withRemoveButton>
              Station: {station}
            </Pill>
          )}
          {classification && (
            <Pill onRemove={() => setClassification(null)} withRemoveButton>
              Classification: {classification}
            </Pill>
          )}
          {weapon && (
            <Pill onRemove={() => setWeapon(null)} withRemoveButton>
              Weapon: {weapon}
            </Pill>
          )}
        </Pill.Group>
      </InputBase>
    )
  );
}
