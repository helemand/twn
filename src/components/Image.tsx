import { ImageType } from "../types";

const Image = ({ url, alt, title }: ImageType) => {
  return (
    <div className="images-container">
      <img src={url} className="top-image" alt={alt} title={title} />
      <div className="image-title">{title}</div>
      <div className="image-fade">
        <div
          style={{
            backgroundImage: `url(${url})`,
          }}
          className="image-fade-img"
        />
      </div>
      <div
        className="image-face"
        style={{
          backgroundImage: `url(${url})`,
        }}
      ></div>
    </div>
  );
};

export default Image;
