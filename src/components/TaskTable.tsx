import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  Table,
  Space,
  Button,
  Popconfirm,
  message,
  Tag,
  Modal,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Task, TaskExecution } from '../types';
import { deleteTask, executeTask, listTasks, searchTasks } from '../api';
import ExecHistoryModal from './ExecHistoryModal';
import dayjs from 'dayjs';

interface Props {
  search: string;
}

// ✅ forwardRef so parent (App.tsx) can call reload()
const TaskTable = forwardRef(({ search }: Props, ref) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Task | null>(null);
  const [execModalVisible, setExecModalVisible] = useState(false);

  async function reload() {
    setLoading(true);
    try {
      const data = search
        ? await searchTasks(search)
        : await listTasks();
      setTasks(data);
    } catch (e) {
      message.error('Failed to load tasks: ' + String(e));
    } finally {
      setLoading(false);
    }
  }

  // run reload() whenever search changes
  useEffect(() => {
    reload();
  }, [search]);

  // expose reload() to parent via ref
  useImperativeHandle(ref, () => ({ reload }));

  const columns: ColumnsType<Task> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name', render: (t) => <b>{t}</b> },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Command', dataIndex: 'command', key: 'command', render: (cmd) => <Tag>{cmd}</Tag> },
    {
      title: 'Executions',
      key: 'execs',
      render: (_, record) => <span>{record.taskExecutions.length}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setSelected(record);
              setExecModalVisible(true);
            }}
            aria-label={'View executions ' + record.id}
          >
            History
          </Button>
          <Button
            type="primary"
            onClick={async () => {
              try {
                const exec: TaskExecution = await executeTask(record.id);
                Modal.info({
                  title: 'Execution Result',
                  content: (
                    <div>
                      <div>
                        <b>Start:</b>{' '}
                        {dayjs(exec.startTime).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                      <div>
                        <b>End:&nbsp;&nbsp;</b>{' '}
                        {dayjs(exec.endTime).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>
                        {exec.output}
                      </pre>
                    </div>
                  ),
                  width: 700,
                });
                await reload();
              } catch (e) {
                message.error('Execution failed: ' + String(e));
              }
            }}
          >
            Run
          </Button>
          <Popconfirm
            title="Delete this task?"
            onConfirm={async () => {
              try {
                await deleteTask(record.id);
                message.success('Deleted');
                reload();
              } catch (e) {
                message.error('Delete failed: ' + String(e));
              }
            }}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 8 }}
        aria-label="Tasks table"
        bordered
      />
      <ExecHistoryModal
        visible={execModalVisible}
        onClose={() => setExecModalVisible(false)}
        task={selected}
      />
    </>
  );
});

export default TaskTable;
