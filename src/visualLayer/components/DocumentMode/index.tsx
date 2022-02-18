import { Tag } from 'antd';

export function renderDocumentModeTab(mode: string): JSX.Element {
  switch (mode) {
    case 'edit': return <Tag color="orange">editing</Tag>;
    case 'sign': return <Tag color="green">signed</Tag>;
    case 'submit': return <Tag color="blue">submitted</Tag>;
    default: return <Tag color="white">--</Tag>;
  }
}
