// Mock content for the home page. Later: load from Firestore (e.g. a "promotions" collection).
export const hero = {
  title: 'Final Offer',
  discount: 50,
  text: 'sale for all furniture items',
  image: '', // headphones image URL
};

export const services = [
  { icon: 'warranty', label: '2 Years warranty' },
  { icon: 'shipping', label: 'Free shipping' },
  { icon: 'returns', label: 'Return policy in 30 days' },
];

export const promos = {
  large: { id: 'phones', title: 'Phones Sale', discount: 30, text: 'sale for all phones!', image: '' },
  small: [
    { id: 'electronics', title: 'Electronics Sale', discount: 70, text: 'sale for all electronics items', image: '' },
    { id: 'furniture', title: 'Furniture Offer', discount: 50, text: 'sale for all furniture items', image: '' },
  ],
};

export const banner = {
  title: 'Phone of the year',
  text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.',
  image: '', // clock image URL
};
