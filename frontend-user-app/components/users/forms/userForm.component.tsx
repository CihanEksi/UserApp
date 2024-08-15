import { Modal, Form, Input, Button, InputNumber, FormInstance } from 'antd';
import { IUser } from '@/interfaces/users/users.interface';
import { useEffect } from 'react';
import { capitalFirstLetter } from '@/utils/strings/string.format';

interface UserFormProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: IUser) => void;
    initialValues?: Partial<IUser>;
    form: FormInstance<any>
}

const getRulesMessage = (name: string) => {
    return `Please input your ${name}!`;
}

const FormElements = [
    {
        name: 'id',
        rules: [],
        placeholder: 'ID',
        type: 'text',
        disabled: true
    },
    {
        name: 'name',
        rules: [{ required: true, message: getRulesMessage('name') }],
        placeholder: 'John',
        type: 'text'
    },
    {
        name: 'surname',
        rules: [{ required: true, message: getRulesMessage('surname') }],
        placeholder: 'Doe',
        type: 'text'
    },
    {
        name: 'email',
        rules: [{ required: true, message: getRulesMessage('email') }],
        placeholder: 'example@email.com',
        type: 'email'
    },
    {
        name: 'phone',
        rules: [{ required: true, message: getRulesMessage('phone') }],
        placeholder: '123-456-7890',
        type: 'text'
    },
    {
        name: 'password',
        rules: [{ required: true, message: getRulesMessage('password') }],
        placeholder: 'password',
        customElement: Input.Password,
        type: 'password'
    },
    {
        name: 'age',
        rules: [{ required: true, message: getRulesMessage('age') }],
        placeholder: '18',
        customElement: InputNumber,
    },
    {
        name: 'country',
        rules: [{ required: true, message: getRulesMessage('country') }],
        placeholder: 'Country Name',
        type: 'text'

    },
    {
        name: 'district',
        rules: [{ required: true, message: getRulesMessage('district') }],
        placeholder: 'District Name',
        type: 'text'
    },
]

const UserForm: React.FC<UserFormProps> = ({ form, visible, onClose, onSubmit, initialValues }) => {

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const isUpdateProcess = initialValues?.id;


    return (
        <Modal
            open={visible}
            title={initialValues?.id ? "Update User" : "Add User"}
            onCancel={() => {
                onClose();
            }}
            footer={null}
        >
            <Form form={form} onFinish={onSubmit}>
                {FormElements.map((element) => {
                    const SubElement = element.customElement || Input;
                    if (isUpdateProcess) {
                        if (element.name === 'password') {
                            return null;
                        }
                        if (element.name === 'id') {
                            return <Form.Item
                                key={element.name}
                                label={capitalFirstLetter(element.name)}
                                name={element.name}
                                rules={element.rules}
                                labelCol={{ span: 5 }}
                            >
                                <SubElement
                                    placeholder={element.placeholder}
                                    disabled
                                />
                            </Form.Item>
                        }
                    } else if ((!isUpdateProcess) && element.name === 'id') {
                        return null;
                    }



                    return <Form.Item
                        key={element.name}
                        label={capitalFirstLetter(element.name)}
                        name={element.name}
                        rules={element.rules}
                        labelCol={{ span: 5 }}
                    >
                        <SubElement
                            placeholder={element.placeholder}
                        />
                    </Form.Item>
                }
                )}
                <Form.Item>
                    <div className="flex justify-end">
                        <Button type="primary" htmlType="submit">
                            {isUpdateProcess ? "Update" : "Save"}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserForm;
