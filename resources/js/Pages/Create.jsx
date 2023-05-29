import React, { useState } from "react";
import { Link, router } from "@inertiajs/react"; // We need to import this router for making POST request with our form
import { Button, Card, Checkbox, Divider, Form, Input, message } from "antd";

export default function Create() {
    const onFinish = (values) => {
        router.post("/post", values);
        message.success("Post created successfully");
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className="flex justify-center items-center">
            <Card className="w-4/5 mt-10">
                <Divider orientation="center">Create New Post</Divider>
                <Link href="/post">
                    <Button danger type="default">
                        Back
                    </Button>
                </Link>
                <div className="w-full mt-5">
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Title is required",
                                },
                            ]}
                        >
                            <Input className="rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label="Body"
                            name="body"
                            rules={[
                                {
                                    required: true,
                                    message: "Body is requird",
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="default" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    );
}
