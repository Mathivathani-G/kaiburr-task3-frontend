import { Layout, Typography, Input, Row, Col, Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import type { Task } from './types';

const { Header, Content } = Layout;

export default function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [search, setSearch] = useState('');
  const tableRef = useRef<any>(null);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header style={{ background: '#001529', padding: '0 24px' }}>
        <Typography.Title style={{ color: 'white', margin: 0 }} level={3}>
          Kaiburr Task Manager
        </Typography.Title>
      </Header>

      <Content style={{ padding: '40px' }}>
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col flex="auto">
              <Input.Search
                placeholder="Search tasks by name"
                onSearch={setSearch}
                allowClear
                size="large"
              />
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setFormVisible(true)}
              >
                Add Task
              </Button>
            </Col>
          </Row>

          <TaskTable ref={tableRef} search={search} />
        </Card>

        <TaskForm
  visible={formVisible}
  onClose={() => setFormVisible(false)}
  onSaved={() => tableRef.current?.reload()}
/>

      </Content>
    </Layout>
  );
}
