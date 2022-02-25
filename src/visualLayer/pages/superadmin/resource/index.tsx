/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-template-curly-in-string */

// TODO : Replace hardcoded data with API data

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  List, Button, Skeleton, Form, Input, Select, Modal, notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { ResourcesInterface } from '../../../../model/interfaces/resources';
import { ActionsData, CreateResourceForm, NewResourceResponseData } from '../../../../model/types/resources';
import { getSsd } from '../../../../utils/systemSpecificDataManager';
import CustomModal from '../../../components/CustomModal';
import IconRenderer from '../../../components/IconRenderer';

const createResources = (resourceService: ResourcesInterface) => function Resources(): JSX.Element {
  // #region Constants

  const pageSize = 8;
  const [totalSize, setTotalSize] = useState<number>(8);
  const actions: Array<ActionsData> = getSsd('actions') || [];
  const [pageNo, setPageNo] = useState<number>(1);
  const [loadingResources, setLoadingResource] = useState(false);
  const [listToDisplay, setListToDisplay] = useState<Array<NewResourceResponseData>>([]);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const validateMessages = {
    required: '${label} is required!',
  };

  // #endregion Constants

  // #region Functions

  const getResources = async (_pageNo : number, _pageSize: number) => {
    setLoadingResource(true);
    await getResourcesCount();
    const response = await resourceService.getResources((_pageNo - 1) * _pageSize, _pageSize);
    if (response.success) {
      const resList: Array<NewResourceResponseData> = response.data.resources.map(
        (res) => ({ name: res.name, actions: res.actions, id: res.id }),
      );
      setListToDisplay(resList);
    }
    setLoadingResource(false);
  };

  const getResourcesCount = async () => {
    const resp = await resourceService.getResourcesCount();
    if (resp.success) {
      setTotalSize(resp.data.count);
    }
  };

  const onSave = async (value : {resource : CreateResourceForm}) => {
    const response = await resourceService.createResource(value.resource);
    if (response.success) notification.success({ message: 'Resource successfully created' });
    createResourceModal.hideModal();
  };

  const onEdit = async (data: NewResourceResponseData) => {
    const response = await resourceService.editResource(data);
    if (response.success) {
      notification.success({ message: 'Resource Updated Successfully' });
      const list = listToDisplay.map((val) => {
        if (val.id === data.id) return { id: val.id, name: data.name, actions: data.actions };
        return val;
      });
      setListToDisplay(list);
    }
    editResourceModal.hideModal();
  };

  const onDelete = async (id: string) => {
    const data = await resourceService.deleteResource(id);
    if (data.success) {
      notification.success({ message: 'Resource deleted' });
      getResources(pageNo, pageSize);
    }
  };

  // #endregion Functions

  // #region Modals
  const createResourceModal = CustomModal(
    'Create Resource',
    'Save',
    'Cancel',
    createForm.submit,
    <>
      <Form form={createForm} onFinish={onSave} validateMessages={validateMessages}>
        <Form.Item>
          <Form.Item name={['resource', 'name']} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['resource', 'actions']} label="Actions" rules={[{ required: true }]}>
            <Select
              mode="tags"
              placeholder="Please select"
              style={{ width: '100%' }}
            >
              {
                actions.map((a) => (
                  <Select.Option
                    value={a.id}
                    key={a.id}
                    name={a.id}
                  >
                    {a.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
        </Form.Item>
      </Form>
    </>,
  );

  const editResourceModal = CustomModal(
    'Update Resource',
    'Save',
    'Cancel',
    editForm.submit,
    <>
      <Form form={editForm} onFinish={onEdit} validateMessages={validateMessages}>
        <Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="actions" label="Actions" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              placeholder="Please select"
              style={{ width: '100%' }}
            >
              {
                actions.map((a) => (
                  <Select.Option
                    value={a.id}
                    key={a.id}
                    name={a.id}
                  >
                    {a.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item name="id" required />
        </Form.Item>
      </Form>
    </>,
  );
  // #endregion Modals

  useEffect(() => {
    getResources(pageNo, pageSize);
  }, []);

  return (
    <>
      {createResourceModal.modal}
      {editResourceModal.modal}
      <div>
        <Button onClick={createResourceModal.showModal}>
          {IconRenderer('add')}
        </Button>
        {' '}
        <Button onClick={() => getResources(pageNo, pageSize)}>
          {IconRenderer('refresh')}
        </Button>
      </div>
      <List
        loading={loadingResources}
        itemLayout="horizontal"
        dataSource={listToDisplay}
        bordered
        pagination={{
          current: pageNo,
          pageSize,
          total: totalSize,
          showSizeChanger: false,
          onChange: (page, pageS) => {
            setPageNo(page);
            getResources(page, pageS);
          },
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => {
                editForm.setFieldsValue({
                  name: item.name, actions: item.actions.map((a) => a.name), id: item.id,
                });
                editResourceModal.showModal();
              }}
              >
                edit
              </Button>,
              <Button onClick={() => Modal.confirm({
                title: `Do you want to delete resource ${item.name}`,
                icon: <ExclamationCircleOutlined />,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => onDelete(item.id),
              })}
              >
                delete
              </Button>]}
          >
            <Skeleton avatar title={false} loading={loadingResources} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default createResources;
