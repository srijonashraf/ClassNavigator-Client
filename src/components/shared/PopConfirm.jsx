import React from "react"
import { Button, Popconfirm } from "antd"
import { ExclamationCircleOutlined, FlagOutlined } from '@ant-design/icons';

const PopConfirm = ({ icon, onConfirm, onCancel, title, description, okText, cancelText }) => (
    <Popconfirm
        title={title}
        description={description}
        okText={okText}
        cancelText={cancelText}
        onConfirm={onConfirm}
        onCancel={onCancel}
    >
        {icon}
    </Popconfirm>
)

export default PopConfirm;
