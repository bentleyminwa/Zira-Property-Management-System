export const filterOptions = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Available', value: 'AVAILABLE' },
      { label: 'Rented', value: 'RENTED' },
      { label: 'Maintenance', value: 'MAINTENANCE' },
    ],
  },
  {
    key: 'type',
    label: 'Type',
    options: [
      { label: 'Apartment', value: 'APARTMENT' },
      { label: 'House', value: 'HOUSE' },
      { label: 'Commercial', value: 'COMMERCIAL' },
      { label: 'Condo', value: 'CONDO' },
    ],
  },
];

export const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
];
