import "./style.css";
import React, { useState } from "react";
import { Form, Select, DatePicker, Button } from "antd";
import { tailFormItemLayout } from "../../../constants/tailForm";
import { rangeConfig } from "../../../constants/tailForm";

const { RangePicker } = DatePicker;
const { Option } = Select;

type LayoutType = Parameters<typeof Form>[0]["layout"];

const FormBooking = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
    >
      <div className="form-header">
        <div className="form-header_left">№123123</div>
        <div className="form-header_right">9990₽ в сутки</div>
      </div>

      <Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
        <RangePicker />
      </Form.Item>

      <Form.Item
        name="guest"
        label="Гости"
        rules={[{ required: true, message: "Гости" }]}
      >
        <Select placeholder="выберите количество гостей">
          <Option value="1">1 гость</Option>
          <Option value="2">2 гостя</Option>
          <Option value="3">3 гостя</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Забронировать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormBooking;
