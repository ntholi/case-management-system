import ResourceForm from '@/components/ResourceForm';
import { Grid, GridCol, TextInput } from '@mantine/core';
import React from 'react';

export default function Form() {
  return (
    <>
      <Grid>
        <GridCol span={6}>
          <TextInput name='rciNo' label='RCI No.' placeholder='RCI No.' />
          <TextInput name='obNo' label='OB No.' placeholder='OB No.' />
        </GridCol>
        <GridCol span={6}>
          <TextInput
            name='victim'
            label='Victim'
            component={'button'}
            pointer
          />
        </GridCol>
      </Grid>
    </>
  );
}
