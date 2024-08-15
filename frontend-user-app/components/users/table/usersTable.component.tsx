'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Table, Button, message, Input } from 'antd';
import axios from 'axios';
import { IUser } from "@/interfaces/users/users.interface";
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { buttonColors } from "@/utils/colors/button.colors";

interface IUsersTableProps {
    users: IUser[];
    loading: boolean;
    page: number;
    pageSize: number;
    paginationResponse: { page: number, pageSize: number, totalPage: number, totalRow: number };
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    onSearchKeyChanged: (searchKey: string) => void;
    searchKey: string;
    createNewUser: () => void;
    onEditUser: (user: IUser) => void;
}

const UsersTable = (params: IUsersTableProps) => {
    const { onEditUser, onSearchKeyChanged, createNewUser, users, loading, page, pageSize, paginationResponse, setPage, setPageSize } = params
    const [searchText, setSearchText] = useState("")
    const [renderFirstTriggerBlock, setRenderFirstTriggerBlock] = useState(false)

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Surname', dataIndex: 'surname', key: 'surname' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Country', dataIndex: 'country', key: 'country' },
        { title: 'District', dataIndex: 'district', key: 'district' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
        { title: 'Updated At', dataIndex: 'updated_at', key: 'updated_at' },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: IUser) => (
                <Button
                    onClick={() => onEditUser(record)}
                    icon={<EditOutlined />}
                    type="primary"
                >
                    Edit
                </Button>
            ),
        },
    ];

    useEffect(() => {
        if (!renderFirstTriggerBlock) {
            setRenderFirstTriggerBlock(true)
            return
        }
        const handler = setTimeout(() => {
            onSearchKeyChanged(searchText);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchText, onSearchKeyChanged, renderFirstTriggerBlock, setRenderFirstTriggerBlock]);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <Input.Search placeholder="Type here to Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)}
                    className="max-w-xs"
                />
                <Button
                    style={{ background: buttonColors.green }}
                    icon={<PlusOutlined />} type="primary" onClick={createNewUser} >
                    Create New User
                </Button>
            </div>
            <Table
                className="border-2 rounded-lg"
                dataSource={users}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={{
                    onShowSizeChange: (current: number, size: number) => {
                        setPageSize(size);
                    },
                    total: paginationResponse.totalRow,
                    current: paginationResponse.page,
                    pageSize: paginationResponse.pageSize,
                    onChange: (page: number, pageSize: number) => {
                        setPage(page);
                        setPageSize(pageSize);
                    },
                }}
            />
        </div>
    )
}

export default UsersTable