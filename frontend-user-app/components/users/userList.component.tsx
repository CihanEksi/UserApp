'use client';
import { useState, useEffect } from 'react';
import { Table, Button, message, Spin, Form } from 'antd';
import { IUser } from "@/interfaces/users/users.interface";
import UsersTable from "@/components/users/table/usersTable.component";
import { userMapper } from "@/mappers/users/users.mapper";
import { getUsers, saveUser, updateUser } from "@/utils/api/users.api";
import { PaginationResponse } from "@/interfaces/response/pagination.response.interface";
import UserForm from "@/components/users/forms/userForm.component";
import { LoadingOutlined } from '@ant-design/icons';

export default function Users() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [paginationResponse, setPaginationResponse] = useState<PaginationResponse>({ page: 1, pageSize: 10, totalPage: 1, totalRow: 0 });
    const [searchKey, setSearchKey] = useState<string>("")
    const [visible, setVisible] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<Partial<IUser> | undefined>(undefined);
    const [form] = Form.useForm();

    const fetchUsers = async (page: number, pageSize: number, searchKey: string) => {
        setLoading(true);
        try {
            const response = await getUsers(page, pageSize, searchKey);
            const usersResponse = response.data
            const paginationResponseData = response.pagination;
            const modifiedUsers = userMapper(usersResponse);
            setUsers(modifiedUsers);
            setPaginationResponse(paginationResponseData);
        } catch (error) {
            message.error('Failed to load users.');
        } finally {
            setLoading(false);
        }
    };

    const onClickCreateNewUser = () => {
        setInitialValues(undefined);
        form.resetFields();
        setVisible(true);
    }

    const createUserOnServer = async (values: IUser) => {
        setLoading(true);
        try {
            const createdUser = await saveUser(values);
            fetchUsers(page, pageSize, searchKey);
            message.success('User created successfully.');
        } catch (error: Error | any) {
            message.error(error.message || 'Failed to create user please try again.');
        } finally {
            setLoading(false);
        }
    }

    const updateUserOnServer = async (values: IUser) => {
        setLoading(true);
        try {
            const updatedUser = await updateUser(values);
            fetchUsers(page, pageSize, searchKey);
            message.success('User updated successfully.');
        } catch (error) {
            message.error('Failed to update user please try again.');
        } finally {
            setLoading(false);
        }
    }
    const onSubmitUserForm = async (values: IUser) => {
        if (initialValues) {
            updateUserOnServer(values);
        } else {
            createUserOnServer(values);
        }
        setVisible(false);
    }

    const onCloseUserForm = () => {
        setVisible(false);
        form.resetFields();
    }

    const onEditUser = (user: IUser) => {
        form.setFieldsValue(user);
        setInitialValues(user);
        setVisible(true);
    }

    const onSearchKeyChanged = (searchKey: string) => {
        setSearchKey(searchKey);
    }

    useEffect(() => {
        fetchUsers(page, pageSize, searchKey);
        console.log('fetching users useEffect');
    }, [page, pageSize, searchKey]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            {loading && <Spin indicator={<LoadingOutlined spin />} size='large' />}
            <UserForm
                form={form}
                onClose={onCloseUserForm}
                onSubmit={onSubmitUserForm}
                visible={visible}
                initialValues={initialValues}
            />
            <UsersTable
                createNewUser={onClickCreateNewUser}
                searchKey={searchKey}
                onSearchKeyChanged={onSearchKeyChanged}
                users={users}
                loading={loading}
                page={page}
                pageSize={pageSize}
                paginationResponse={paginationResponse}
                setPage={setPage}
                setPageSize={setPageSize}
                onEditUser={onEditUser}
            />
        </div>
    );
}
