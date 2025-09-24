import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { createOrUpdateTask } from '../api';
import type { Task } from '../types';

const allowedCommands = ['echo', 'date', 'uname', 'whoami', 'ls', 'pwd', 'cat', 'id', 'uptime'];

interface Props {
  visible: boolean;
  onClose: () => void;
  onSaved: () => void;
  initial?: Task | null;
}

export default function TaskForm({ visible, onClose, onSaved, initial }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initial) form.setFieldsValue(initial);
    else form.resetFields();
  }, [initial, form, visible]);

  async function onFinish(values: any) {
    const cmdParts = (values.command || '').trim().split(/\s+/);
    if (!allowedCommands.includes(cmdParts[0])) {
      message.error('Command not allowed. Use safe commands only.');
      return;
    }
    try {
      await createOrUpdateTask(values as Task);
      message.success('Task saved');
      onSaved();
      form.resetFields();
    } catch (e) {
      message.error('Save failed: ' + String(e));
    }
  }

  return (
    <Modal
      title="Create / Update Task"
      open={visible}
      onCancel={() => { onClose(); form.resetFields(); }}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initial || {}}>
        <Form.Item name="id" label="Task ID" rules={[{ required: true, message: 'Please enter task id' }]}>
          <Input aria-label="Task ID" placeholder="unique task id (eg. t1)" />
        </Form.Item>

        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a task name' }]}>
          <Input aria-label="Task name" placeholder="Short descriptive name" />
        </Form.Item>

        <Form.Item name="owner" label="Owner" rules={[{ required: true, message: 'Please enter owner name' }]}>
          <Input aria-label="Owner" placeholder="Your name" />
        </Form.Item>

        <Form.Item name="command" label="Command" rules={[{ required: true, message: 'Please enter a command' }]}>
          <Input aria-label="Shell command" placeholder="date or echo Hello" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => { onClose(); form.resetFields(); }} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">Save</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
