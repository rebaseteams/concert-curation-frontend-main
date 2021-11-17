import React from 'react';
import * as _ from 'lodash';
import {
  Table,
  Space,
  Tag,
  Button,
  Modal,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Importing Services and utils
import getRecommendedArtists from '../../services/getRecommendedArtists';
import deleteConcertForm from '../../services/deleteConcertForm';

interface Forms {
  id: string,
  dateCreated: string,
  concertName: string,
  status: string
}

interface ConcertsTableProp {
  forms: Array<Forms>;
  // TODO: find proper datatype for functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateForms: any;
}

const ConcertsTable = ({ forms, updateForms }: ConcertsTableProp): JSX.Element => {
  const data: Array<Forms> = _.map(forms, (form) => ({
    ...form,
    dateCreated: form.dateCreated.slice(0, 25),
    actions: form.id,
  }));
  const getRecomendation = async (formId: string) => {
    // below line will fetch artists recomended by form id
    // will return recommended artist data
    await getRecommendedArtists(formId);
  };

  const deleteNow = async (id: string) => {
    await deleteConcertForm(id);
    updateForms();
  };

  const deleteConcertModal = (id: string) => {
    Modal.confirm({
      title: 'Delete Concert',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure?',
      okText: 'Yes',
      onOk: () => deleteNow(id),
      cancelText: 'No',
    });
  };

  const columns = [
    {
      title: 'Concert Name',
      dataIndex: 'concertName',
      key: 'concertName',
      render: (text: string): JSX.Element => <p>{text}</p>,
    },
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (tags: boolean): JSX.Element => (
        <>
          {tags ? (
            <Tag color="green" key="success">
              Success
            </Tag>
          ) : (
            <Tag color="yellow" key="pending">
              Pending
            </Tag>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'actions',
      render: (id: string) => (
        <Space size="middle">
          <Link
            style={{
              width: '90%',
            }}
            to={`recommendations/${id}`}
          >
            <Button
              type="link"
              onClick={async () => getRecomendation(id)}
            >
              View Recommendation
            </Button>
          </Link>
          <Button
            onClick={() => deleteConcertModal(id)}
            type="link"
          >
            delete
          </Button>
        </Space>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rowSelection: any = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
      // eslint-disable-next-line no-console
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div className="concert-table-container">

      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        className="concert-table"
      />
    </div>
  );
};

export default ConcertsTable;
