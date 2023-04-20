import { Image } from "antd";

const ImageWithPreview = ({ imageUrl }) => {
  return (
    <Image
      width={35}
      height={35}
      className="py-1  object-contain  mix-blend-multiply"
      src={imageUrl}
      placeholder={<Image preview={false} src={imageUrl} width={30} />}
    />
  );
};

export default ImageWithPreview;
