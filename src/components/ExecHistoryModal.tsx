import React from 'react';
import { Modal, List } from 'antd';
import type { Task } from '../types';
import dayjs from 'dayjs';

interface Props {
  visible: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function ExecHistoryModal({ visible, onClose, task }: Props) {
  return (
    <Modal
      title={task ? `Execution history for ${task.name} (${task.id})` : 'Execution history'}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {!task ? <div>No task selected</div> : (
        <List
          itemLayout="vertical"
          dataSource={task.taskExecutions.slice().reverse()}
          locale={{ emptyText: 'No executions yet' }}
          renderItem={item => (
            <List.Item>
              <div><b>Start:</b> {dayjs(item.startTime).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div><b>End:&nbsp;&nbsp;</b> {dayjs(item.endTime).format('YYYY-MM-DD HH:mm:ss')}</div>
              <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>{item.output}</pre>
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
}
