import React from 'react';

// Add key pairs for rendering icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMapper: any = {
  'Brand awareness': 'campaign',
  'Customer Engagement': 'volunteer_activism',
  'Direct sales': 'rocket_launch',
  card: 'dashboard',
  pie: 'pie_chart',
};

const IconRenderer = (value: string): JSX.Element => {
  const iconValue = iconMapper[value] || '';

  return (
    <span className="material-icons">
      {iconValue}
    </span>
  );
};

export default IconRenderer;
