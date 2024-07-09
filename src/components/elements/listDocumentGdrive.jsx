import React, { useCallback } from 'react';
import moment from 'moment';
import _, { debounce } from 'lodash';

import { Col, Drawer, Row, Button, Input, Table, Tooltip } from 'antd';
const { Search } = Input;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Video',
    dataIndex: 'video',
    key: 'video',
    width: 200,
    render: (_, record) => (
      <iframe
        src={`https://drive.google.com/file/d/${record?.id}/preview`}
        width="100%"
        height="auto"
        allow="autoplay"
        style={{ maxWidth: 200, maxHeight: 200 }}
      ></iframe>
    ),
  },
  {
    title: 'Last Modified Date',
    dataIndex: 'modifiedTime',
    key: 'modifiedTime',
    render: (text) => <span>{moment(text).format('Do MMM YYYY HH:mm A')}</span>,
  },
  {
    title: 'Action',
    key: 'status',
    dataIndex: 'status',
    render: (_, record) => (
      <span>
        <Tooltip title="Download">
          <Button
            onClick={() => window.open(`https://drive.google.com/uc?id=${record.id}&export=download`)}
            type="primary" ghost>
            Download
          </Button>
        </Tooltip>
      </span>
    ),
  },
];
const ListDocumentGdrive = ({ visible, onClose, documents = [], onSearch, signedInUser, isLoading, onSignOut }) => {
  // console.log('documents', documents);
  const search = (value) => {
    delayedQuery(`name contains '${value}'`);
  };

  const delayedQuery = useCallback(
    debounce((q) => onSearch(q), 500),
    []
  );

  return (
    <>
      <Drawer
        title="Select Google Drive Document"
        placement="right"
        closable
        onClose={onClose}
        visible={visible}
        width={900}
        key={visible}
      >
        <Row gutter={16}>
          <Col span={24}>
            <div style={{ marginBottom: 20 }}>
              <p>Signed In as: {`${signedInUser?.Ad} (${signedInUser?.cu})`}</p>
              <button
                className="text-white bg-red-500 p-1 mt-1 rounded-md"
                onClick={onSignOut}>Sign Out</button>

            </div>

            <div className="table-card-actions-container">
              <div className="table-search-container">
                <Search
                  placeholder="Search Google Drive"
                  onChange={(e) => search(e.target.value)}
                  onSearch={(value) => search(value)}
                  className="table-search-input"
                  size="large"
                  enterButton
                />
              </div>
            </div>
            <Table
              rowKey="id"
              className="table-striped-rows"
              columns={columns}
              dataSource={documents}
              pagination={{ simple: true }}
              loading={isLoading}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default ListDocumentGdrive;
