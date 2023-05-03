import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { setProductImageFiles } from "../features/productSlice";

const SelectMultiImages = ({ isSuccess }) => {
  const dispatch = useDispatch();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    isSuccess && setFileList([]);
  }, [isSuccess]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    let filterList = newFileList.map((data) => data.originFileObj);
    setFileList(newFileList);
    dispatch(setProductImageFiles(filterList));
  };
  const beforeUpload = () => false;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Add Image
      </div>
    </div>
  );
  return (
    <div className=" bg-white p-[1.5rem] w-full border">
      <h2 className=" text-[1.125rem] mb-5"> Images</h2>

      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default SelectMultiImages;
