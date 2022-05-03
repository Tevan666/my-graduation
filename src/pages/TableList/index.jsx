import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Image, Drawer, Tooltip, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, deleteHistory, removeRule } from '@/services/ant-design-pro/api';
import MapChart from '@/components/Charts/mapChart';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const { confirm } = Modal;
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */

  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  // useEffect(() => {
  //   rule({ access: true }).then((res) => {
  //     setMapData(res.data);
  //   });
  // }, []);

  const intl = useIntl();
  const handleDelete = async (props) => {
    confirm({
      title: '你确定要删除吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteHistory({ id: props.id }).then((res) => {
          if (res.code == 0) {
            message.success(res.message);
            actionRef?.current.reload();
          } else if (res.message) {
            message.error(res.message);
          }
        });
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="Rule name"
        />
      ),
      dataIndex: 'name',
      key: 'name',
      tip: 'The rule name is the unique key',
      render: (text, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.type" defaultMessage="类型" />,
      dataIndex: 'type',
      key: 'type',
      valueEnum: {
        animal: {
          text: '动物',
        },
        plant: {
          text: '植物',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Description" />,
      dataIndex: 'description',
      key: 'description',
      valueType: 'textarea',
      search: false,
      width: 180,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} className="truncate">
          {text}
        </Tooltip>
      ),
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleCallNo"
          defaultMessage="Number of service calls"
        />
      ),
      dataIndex: 'baike_url',
      key: 'baike_url',
      hideInForm: true,
      search: false,
      width: 180,
      ellipsis: true,
      render: (text) => {
        return (
          <Tooltip title={text} className="truncate text-white">
            <a href={text?.props?.children} target="_blank" rel="noreferrer">
              {text}
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.picture" defaultMessage="图片地址" />,
      dataIndex: 'img_url',
      key: 'img_url',
      hideInForm: true,
      search: false,
      width: 180,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text} className="truncate">
          <a href={text?.props?.children} target="_blank" rel="noreferrer">
            {text}
          </a>
        </Tooltip>
      ),
    },
    {
      title: <FormattedMessage id="pages.searchTable.square" defaultMessage="square" />,
      dataIndex: 'square',
      key: 'square',
      hideInForm: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleUpdatedAt"
          defaultMessage="Last scheduled time"
        />
      ),
      sorter: true,
      dataIndex: 'upload_time',
      key: 'upload_time',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      render: (current, record, index, action) => {
        return (
          <>
            <a onClick={() => handleDelete(record)}>
              <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
            </a>
          </>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <MapChart />

      <ProTable
        className="mt-5"
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        // toolBarRender={() => [
        //   <Button
        //     type="primary"
        //     key="primary"
        //     onClick={() => {
        //       handleModalVisible(true);
        //     }}
        //   >
        //     <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
        //   </Button>,
        // ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
