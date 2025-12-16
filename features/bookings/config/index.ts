export const filterOptions = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Pending', value: 'PENDING' },
      { label: 'Confirmed', value: 'CONFIRMED' },
      { label: 'Cancelled', value: 'CANCELLED' },
      { label: 'Completed', value: 'COMPLETED' },
    ],
  },
];

export const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];
