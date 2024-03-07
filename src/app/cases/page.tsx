'use client';

import {
  CreateView,
  CreateViewProps,
  DetailsView,
  EditView,
  EditViewProps,
  FieldView,
  ImagePicker,
  ReferenceField,
  ReferenceView,
  ResourcePage,
  TextField,
} from '@/app/admin-core';
import { Box, Divider, Image } from '@mantine/core';
import { IconCheck, IconExclamationMark } from '@tabler/icons-react';
import NextImage from 'next/image';
import RichTextField from '../admin-core/form/RichTextField';
import TextAreaField from '../admin-core/form/TextAreaField';
import PublishSwitch from './PublishSwitch';
import { caseRepository } from './repository';
import { IconExclamationCircle } from '@tabler/icons-react';
import { Case } from '@prisma/client';

export default function CasePage() {
  return (
    <ResourcePage
      resourceLabel='Cases'
      repository={caseRepository}
      create={CaseCreate}
      edit={CaseEdit}
      details={CaseDetails}
      navLinkProps={(it) => ({
        label: it.title,
      })}
    ></ResourcePage>
  );
}

function CaseDetails({ item }: { item: Case }) {
  return (
    <DetailsView>
      <FieldView label='Title' value={item.title} />
      <FieldView label='Description' value={item.description} />
    </DetailsView>
  );
}

function CaseCreate(props: CreateViewProps<Case>) {
  return (
    <CreateView {...props}>
      <TextField name='title' />
      <TextAreaField name='description' />
    </CreateView>
  );
}

function CaseEdit(props: EditViewProps<Case>) {
  return (
    <EditView {...props}>
      <TextField name='title' />
      <TextAreaField name='description' />
    </EditView>
  );
}
