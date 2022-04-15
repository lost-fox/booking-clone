export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const rangeConfig = {
  rules: [
    { type: "array" as const, required: true, message: "Please select time!" },
  ],
};
