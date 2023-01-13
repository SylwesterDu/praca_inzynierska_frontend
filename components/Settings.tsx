"use client";
import {
  Col,
  Container,
  Input,
  Spacer,
  Text,
  Image,
  Grid,
  Button,
  Modal,
  FormElement,
  Row,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import { createRef, useState } from "react";
import { useAuth } from "../AuthContext";
import { api } from "../axios";

type UploadFile = {
  file?: File;
};

export function Settings() {
  const { userData, getUserData } = useAuth();
  const [changeAvatarOpened, setChangeAvatarOpened] = useState(false);
  const inputFileRef = createRef<FormElement>();

  async function deleteCurrentAvatar() {}

  async function changeAvatar(values: UploadFile) {
    let formData = new FormData();
    formData.append("file", values.file!);
    const response = await api.post("user/change-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    getUserData();
    setChangeAvatarOpened(false);
  }

  const initialValue: UploadFile = {
    file: null!,
  };

  return (
    <>
      <Modal
        closeButton
        open={changeAvatarOpened}
        onClose={() => setChangeAvatarOpened(false)}
      >
        <Modal.Header>
          <Text h3>Zmień awatar</Text>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValue} onSubmit={changeAvatar}>
            {({ setFieldValue, values }) => (
              <Form>
                <Col>
                  {values.file && (
                    <Text style={{ textAlign: "center" }}>
                      {values.file.name}
                    </Text>
                  )}

                  <Input
                    type="file"
                    css={{ display: "none" }}
                    ref={inputFileRef}
                    onChange={(e) => {
                      const target = e.currentTarget as HTMLInputElement;
                      setFieldValue("file", target.files![0]);
                    }}
                  />

                  <Spacer y={0.4} />
                  <Button
                    css={{ width: "100%" }}
                    onClick={() => inputFileRef.current?.click()}
                  >
                    Wybierz plik
                  </Button>
                  <Spacer y={0.4} />
                  <Button
                    css={{ width: "100%" }}
                    color="error"
                    onClick={deleteCurrentAvatar}
                  >
                    Usuń obecny awatar
                  </Button>
                  <Spacer y={1} />

                  {values.file && (
                    <Button
                      css={{ width: "100%" }}
                      color="success"
                      type="submit"
                    >
                      Zmień awatar
                    </Button>
                  )}
                </Col>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <Container>
        <Text h2>Ustawienia</Text>
        <Grid.Container>
          <Grid xs={5}>
            <Col>
              <Image
                height={300}
                src={
                  userData.avatar ??
                  "https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                }
                alt="avatar"
                objectFit="cover"
                css={{
                  borderRadius: 10,
                  width: "100%",
                }}
              />
              <Spacer y={1} />
              <Button
                css={{ width: "100%" }}
                onClick={() => {
                  setChangeAvatarOpened(true);
                }}
              >
                Zmień Avatar
              </Button>
            </Col>
          </Grid>
        </Grid.Container>
        <Col>
          <Spacer y={1} />
          <Input
            bordered
            borderWeight="light"
            label="Nazwa użytkownika"
            value={userData.username}
          />
        </Col>
      </Container>
    </>
  );
}
