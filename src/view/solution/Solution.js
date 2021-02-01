import React, { useEffect, useState } from 'react';
import { Table, Select, Button, Modal, message, Input } from 'antd';
import { DeleteOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'utils/helpers/helpers';
import { getSolutions } from './SolutionAction';
import PaginationTable from 'components/pagination/Pagination';
import './Solution.scss';
import { getModels, getLanguages } from '../system/systemAction';
import { cloneSolution, deleteSolution } from './SolutionAction';

let params = { page: 0, size: 10 };
const colorView = { width: 20, height: 20, margin: 'auto' };
const TYPE = {
  REORDER: 'REORDER',
  PUSH: 'PUSH',
  CREATE: 'CREATE',
  COPY: 'COPY',
};
let itemSelected = {};

const Solution = (props) => {
  const [visible, setVisible] = useState(null);
  useEffect(() => {
    props.getModels();
    props.getLanguages();
    return () => {
      params = { page: 0, size: 10 };
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!isEmpty(props.models)) {
      params = { ...params, model: props.models[0] };
      handleFetchData();
    }
    // eslint-disable-next-line
  }, [props.models]);

  const handleFetchData = () => {
    props.getSolutions(params);
  };

  const onChangePagination = (page, size) => {
    params = { ...params, page: page - 1, size };
    handleFetchData();
  };
  const handleCloneData = async (record) => {
    try {
      const { data } = await cloneSolution({
        models: [record.model],
        solutionId: record.id,
      });
      if (!isEmpty(data.data)) {
        itemSelected = { ...data.data[0] };
      } else {
        itemSelected = {};
      }
      setVisible(TYPE.COPY);
    } catch (err) {
      setVisible(TYPE.COPY);
    }
  };
  const handleDelete = (record) => {
    Modal.confirm({
      title: (
        <span>
          Bạn có chắc chắn muốn xóa <b>{`"${record.name}"`}</b>?
        </span>
      ),
      content: null,
      centered: true,
      onOk: async () => {
        try {
          await deleteSolution({ id: record.id });
          message.success('Delete solution successfully!');
          handleFetchData();
        } catch (err) {
          message.error('Delete solution fail!');
        }
      },
      onCancel: () => {},
    });
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'no',
      align: 'center',
      key: 'no',
      width: 70,
      render: (text, record, index) => {
        return <span>{params.page * params.size + index + 1}</span>;
      },
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Summary', dataIndex: 'summary', key: 'summary' },
    { title: 'Small icon', dataIndex: 'small_icon', key: 'small_icon' },
    {
      title: 'Store package',
      dataIndex: 'store_package',
      key: 'store_package',
    },
    { title: 'Version code', dataIndex: 'version_code', key: 'version_code' },
    { title: 'Model', dataIndex: 'model', key: 'model' },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      align: 'center',
      render: (text, record) => (
        <div
          title={text}
          style={{ ...colorView, backgroundColor: record.color }}
        />
      ),
    },
    { title: 'Language', dataIndex: 'lang', key: 'lang' },
    {
      title: 'Thực hiện',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record) => {
        return (
          <span className="event-icon">
            <EditOutlined
              title="edit"
              onClick={() => {
                itemSelected = { ...record };
                setVisible(TYPE.CREATE);
              }}
            />
            <DeleteOutlined
              title="delete"
              onClick={() => handleDelete(record)}
            />
            <CopyOutlined
              title="copy"
              onClick={() => handleCloneData(record)}
            />
          </span>
        );
      },
    },
  ];

  return (
    <div className="solution-container">
      <p className="total-text">
        Total: <b>{props.solutions.totalElements || 0}</b> solutions
      </p>
      <div className="filter-container">
        <div className="left-action">
          <span>Model</span>
          {!isEmpty(props.models) && (
            <Select
              style={{ width: 300, marginLeft: 30 }}
              defaultValue={props.models[0]}
              onChange={(value) => {
                params = { page: 0, size: 10, model: value };
                handleFetchData();
              }}
            >
              {props.models.map((el, idx) => (
                <Select.Option value={el} key={idx}>
                  {el}
                </Select.Option>
              ))}
            </Select>
          )}
          <Input.Search
            placeholder="Name"
            onSearch={(value) => {
              params = { ...params, name: value.trim() };
              if (isEmpty(value.trim())) delete params.name;
              handleFetchData();
            }}
            onChange={(e) => {
              if (isEmpty(e.target.value.trim()) && params.name) {
                delete params.name;
                handleFetchData();
              }
            }}
            style={{ width: 300, marginLeft: 20 }}
            enterButton
          />
        </div>

        <div className="right-action">
          <Button
            type="primary"
            onClick={() => setVisible(TYPE.PUSH)}
            className="common-btn submit-btn upper-case"
          >
            Push Notification
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => setVisible(TYPE.CREATE)}
            className="common-btn submit-btn upper-case"
          >
            Create
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => setVisible(TYPE.REORDER)}
            className="common-btn submit-btn upper-case"
          >
            Reorder
          </Button>
        </div>
      </div>
      <Table
        bordered
        className="table-content"
        // rowSelection={rowSelection}
        dataSource={props.solutions.content || []}
        rowKey={(record) => record.id}
        pagination={false}
        // loading={system.isFetching}
        columns={columns}
      />
      {!isEmpty(props.solutions.content) &&
        props.solutions.totalElements > 0 && (
          <PaginationTable
            page={params.page}
            size={params.size}
            onChange={onChangePagination}
            totalElements={props.solutions.totalElements}
          />
        )}
    </div>
  );
};
export default connect(
  (state) => ({
    solutions: state.solution.solutions,
    models: state.system.models,
    languages: state.system.languages,
  }),
  { getSolutions, getModels, getLanguages }
)(withRouter(Solution));
