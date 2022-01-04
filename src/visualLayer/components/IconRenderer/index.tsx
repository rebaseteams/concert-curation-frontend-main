// Add key pairs for rendering icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMapper: any = {
  'Brand awareness': 'campaign',
  'Customer Engagement': 'volunteer_activism',
  'Direct sales': 'rocket_launch',
  card: 'dashboard',
  pie: 'pie_chart',
  back: 'arrow_back',
  location: 'place',
  add: 'add',
  concertName: 'badge',
  date: 'event',
  artistName: 'account_circle',
  avatar: 'account_circle',
  managerEmail: 'email',
  managerName: 'manage_accounts',
  managerMobile: 'phone',
  managerAddress: 'home',
  groupName: 'groups',
  waving_hand: 'waving_hand',
  refresh: 'refresh',
  menu: 'menu',
  share: 'share',
  email: 'email',
  send: 'send',
};

const IconRenderer = (value: string): JSX.Element => {
  const iconValue = iconMapper[value] || 'description';

  return (
    <span className="material-icons">
      {iconValue}
    </span>
  );
};

export default IconRenderer;
