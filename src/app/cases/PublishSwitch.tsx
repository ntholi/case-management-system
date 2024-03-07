import { Flex, Switch, rem, useMantineTheme } from '@mantine/core';
import {
  IconCheck,
  IconCircleCheck,
  IconCircleCheckFilled,
  IconExclamationCircle,
  IconX,
} from '@tabler/icons-react';
import React, { useEffect, useState, useTransition } from 'react';
import { Post } from './Post';
import { postRepository } from './repository';

type Props = {
  article: Post;
};

export default function PublishSwitch({ article }: Props) {
  const theme = useMantineTheme();
  const { published } = article;
  const [isPending, startTransition] = useTransition();

  const update = () => {
    startTransition(async () => {
      await postRepository.updatePublishStatus(article.id, !published);
    });
  };

  return (
    <Flex justify={'space-between'}>
      <Switch
        checked={published}
        onChange={update}
        color='teal'
        size='sm'
        label={
          isPending ? 'Updating...' : published ? 'Published' : 'Unpublished'
        }
        description='Click switch to publish or unpublished this article.'
        disabled={isPending}
        thumbIcon={
          published ? (
            <IconCheck
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.teal[6]}
              stroke={3}
            />
          ) : (
            <IconX
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.red[6]}
              stroke={3}
            />
          )
        }
      />
      <>
        {published ? (
          <IconCircleCheck size={'2rem'} />
        ) : (
          <IconExclamationCircle size={'2rem'} />
        )}
      </>
    </Flex>
  );
}
