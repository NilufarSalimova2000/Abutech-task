import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Upload } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { dataType } from "../../service/mutation/useCreateType";
import { useCreateContracts } from "../../service/mutation/useCreateContracts";
import { useUploadFile } from "../../service/mutation/useUploadFile";
import { client } from "../../config/query-client";

interface formDataType {
  title?: string;
  courseId?: number;
}

interface CreatContractProps {
  visible: boolean;
  onClose: () => void;
}

export const CreatContract: React.FC<CreatContractProps> = ({
  visible,
  onClose,
}) => {
  const { mutate } = useCreateContracts();
  const { mutate: mutateFile } = useUploadFile();
  const [rensData, setResponsData] = useState<dataType | any>();

  const submit = (data: formDataType) => {
    mutate(
      {
        title: data.title,
        courseId: 0,
        attachment: {
          url: rensData?.data[0].path,
          origName: rensData?.data[0].fileName,
          size: rensData?.data[0].size,
        },
      },
      {
        onSuccess: () => {
          client.invalidateQueries(["contract"])
          message.success("Muvaffaqiyatli qo'shildi");
          onClose();
        },
        onError: (err) => {
          console.log(err);

          message.error("Xatolik");
        },
      }
    );
  };

  const handleFileUpload = (file: any) => {
    const formData = new FormData();

    formData.append("files", file.file);
    mutateFile(formData, {
      onSuccess: (res) => {
        setResponsData(res);


        message.success("Fayl yuklandi");
        file.onSuccess?.();
      },
      onError: (err) => {
        message.error("Xatolik");
        file.onError?.(err);
      },
    });
  };

  return (
    <Modal
      title="Shartnoma yaratish"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={submit}>
        <div style={{ margin: "32px 0" }}>
          <Form.Item
            name={"title"}
            label={"Kurs"}
            rules={[{ required: true, message: "Kursni tanlang" }]}
          >
            <Input size="large" />
          </Form.Item>
        </div>
        <div style={{ marginBottom: "32px" }}>
          <Form.Item
            name={"courseId"}
            label="Nomi"
            rules={[{ required: true, message: "Nomini kiriting" }]}
          >
            <Input size="large" />
          </Form.Item>
        </div>
        <div style={{marginBottom: "32px"}}>
          <Upload
            customRequest={handleFileUpload}
            showUploadList={true}
            maxCount={1}
            accept=".jpg,.png,.doc,.docx"
            listType="text"
          >
            <Button
              style={{
                color: "#0eb182",
                border: "1px dashed #ddd",
                padding: "20px 181px",
                marginTop: "15px",
              }}
              icon={
                <PaperClipOutlined
                  style={{ color: "#0eb182" }}
                />
              }
            >Fayl biriktiring
            </Button>
          </Upload>
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
