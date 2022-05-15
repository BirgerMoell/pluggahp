import { FC, useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import styled from "@emotion/styled";
import LogoImage from "../LogoImage";
import { UploadOutlined } from "@mui/icons-material";

const InputContentWrapper = styled.div<{ hasPreviewImg: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: ${({ hasPreviewImg }) => (hasPreviewImg ? 0 : 1)};

  ${({ hasPreviewImg }) =>
    hasPreviewImg && `background-color: rgba(0, 0, 0, 0.5); color: #fff;`};

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

type Props = {
  onChange: (file: Blob) => void;
  previewLogoPath?: string;
  alt?: string;
  value: Blob[];
};

const LogoUpload: FC<Props> = ({
  alt = "",
  previewLogoPath = "",
  value,
  onChange,
}) => {
  const [logoPreview, setLogoPreview] = useState("");

  useEffect(() => {
    // this way, the outside form reset
    // will remove the logo preview
    if (!value) {
      setLogoPreview("");
    }
  }, [value, previewLogoPath]);

  return (
    <Dropzone
      onDropAccepted={(files) => {
        setLogoPreview(URL.createObjectURL(files[0]));
        onChange(files[0]);
      }}
      maxSize={10000000}
      multiple={false}
      accept="image/png"
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          style={{
            borderRadius: 6,
            width: "100%",
            border: "1px solid #cecece",
            background: "#FEFEFE",
            height: "400px",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()}></input>

          {logoPreview ? (
            logoPreview && (
              <img
                alt=""
                src={logoPreview}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  position: "absolute",
                  objectFit: "contain",
                }}
              />
            )
          ) : (
            <>
              {previewLogoPath && (
                <LogoImage
                  alt={alt}
                  path={previewLogoPath}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    position: "absolute",
                    objectFit: "contain",
                  }}
                />
              )}
              <InputContentWrapper hasPreviewImg={!!previewLogoPath}>
                <UploadOutlined />
                <div style={{ padding: "0 8px" }}>
                  Upload or drop an image (png)
                </div>
              </InputContentWrapper>
            </>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default LogoUpload;
