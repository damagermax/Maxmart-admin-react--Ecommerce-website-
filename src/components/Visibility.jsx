import { Radio, Space } from "antd";

const Visibility = ({ visibilityValue, onVisibilityChange }) => {
  return (
    <div className=" bg-white p-[1.5rem] w-full border h-fit col-span-1">
      <h2 className=" text-[1.125rem] mb-5"> Visibility</h2>
      <Radio.Group onChange={onVisibilityChange} value={visibilityValue}>
        <Space direction="vertical">
          <Radio value={true}>Visible</Radio>
          <Radio value={false}>Hidden</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Visibility;
