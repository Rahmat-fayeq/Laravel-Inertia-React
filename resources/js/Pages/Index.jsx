import { SearchOutlined } from "@ant-design/icons";
import { router, Link } from "@inertiajs/react";
import {
    Button,
    Divider,
    Input,
    Popconfirm,
    Space,
    Table,
    message,
} from "antd";
import { useState } from "react";

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Tile",
        dataIndex: "title",
        key: "title",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
                <div className="flex flex-col">
                    <Input
                        className="rounded-md w-full focus:ring-0 "
                        placeholder="Type text here..."
                        autoFocus={true}
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : ""
                            );
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => confirm()}
                    />
                    <div className="flex flex-row items-center justify-center gap-2 my-1">
                        <Button
                            size="small"
                            type="default"
                            onClick={() => confirm()}
                        >
                            Search
                        </Button>
                        <Button
                            size="small"
                            danger
                            onClick={() => {
                                setSelectedKeys("");
                                confirm();
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            );
        },
        filterIcon: () => {
            return <SearchOutlined />;
        },
        onFilter: (value, record) => {
            return record.title.toLowerCase().includes(value.toLowerCase());
        },
    },
    {
        title: "Body",
        dataIndex: "body",
        key: "body",
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <Link href={`/post/${record.id}/edit`}>
                    <Button type="default">Edit</Button>
                </Link>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => handleDelete(record)}
                    onCancel={() => {}}
                    okText="Yes"
                    okType="danger"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            </Space>
        ),
    },
];

function handleDelete(record) {
    router.delete(`/post/${record.id}`);
    message.success(`Task ${record.id} has been deleted`);
}

export default function Index({ posts, user }) {
    const [searchText, setSearchText] = useState("");

    return (
        <div className="w-full h-screen bg-white">
            <Divider orientation="center">Your Posts</Divider>
            <div className=" mb-5 ml-40 ">
                <Link href="/post/create">
                    <Button type="default">Create new post</Button>
                </Link>
            </div>

            <div className="flex items-center justify-center">
                <Table
                    dataSource={posts}
                    columns={columns}
                    className="w-4/5 shadow-md"
                />
            </div>
        </div>
    );
}
