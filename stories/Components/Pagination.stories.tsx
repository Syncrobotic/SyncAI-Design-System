import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Pagination } from '../../src/components/Pagination';

const meta = {
  component: Pagination,
  args: {
    page: 1,
    pageCount: 8,
    onPageChange: (_page: number) => {},
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    const pageCount = 8;
    return (
      <Pagination
        page={page}
        pageCount={pageCount}
        onPageChange={setPage}
        boundaryCount={1}
        siblingCount={1}
      />
    );
  },
};

export const WithEllipsis: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    const pageCount = 10;
    return <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />;
  },
};

