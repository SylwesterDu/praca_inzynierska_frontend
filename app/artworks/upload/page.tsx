"use client";
import {
  Card,
  Container,
  Text,
  Progress,
  Button,
  Row,
  Spacer,
  Col,
  Input,
  Dropdown,
  FormElement,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import { createRef, Key, useEffect, useMemo, useRef, useState } from "react";
import { api } from "../../../axios";
import { UploadArtwork } from "../../../types/ArtworkTypes";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(4);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artType, setArtType] = useState<Key>(0);
  const [genre, setGenre] = useState<Key>("");
  const [uploadProcessId, setUploadProcessId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileButton = createRef<FormElement>();

  const genres: { [artType: number]: string[] } = useMemo(() => {
    return {
      0: [
        "Pop",
        "Rap",
        "Rock/metal",
        "Instrumentalna",
        "Techno",
        "Jazz",
        "Reggae",
        "Folk",
        "Inny",
      ],
      1: ["Wiersz", "Powieść", "Komiks", "Teksty piosenek", "Inne"],
      2: ["Fotografia cyfrowa", "Grafika komputerowa", "Malarstwo", "Inne"],
      3: ["Modelarstwo", "Żeźbiarstwo", "Wzory drukarek 3D", "Origami", "Inne"],
    };
  }, []);

  const initialValues: UploadArtwork = {
    title: "",
    artType: 0,
    description: "",
    genres: [],
    tags: [],
  };

  async function beginUploadProcess() {
    const response = await api.get("upload");
    setUploadProcessId(response.data.id);
  }

  useEffect(() => {
    beginUploadProcess();
  }, []);

  useEffect(() => {
    setGenre(genres[+artType][0]);
  }, [artType, genres]);

  function translate(artType: number) {
    switch (artType) {
      case 0:
        return "Muzyka";
      case 1:
        return "literatura";
      case 2:
        return "Fotografia";
      case 3:
        return "Inna";
      default:
        return "Muzyka";
    }
  }

  function parseTags(e: any) {
    let tagsString: string = e.target.value.replace("#", "").trim();
    if (tagsString.length == 0) {
      setTags([]);
      return;
    }
    let tags: string[] = tagsString.split(" ");
    setTags(tags);
    return tags;
  }

  function doInputFileAction(_: any) {
    fileButton.current?.click();
  }

  async function addFile(e: any) {
    setFiles([...files, ...e.target.files]);
    for (const file of e.target.files) {
      let formData = new FormData();
      formData.append("formFile", file);
      const response = await api.post(`upload/${uploadProcessId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    }
  }

  async function uploadArtwork(values: UploadArtwork) {
    const response = await api.post(
      `upload/${uploadProcessId}/publish`,
      values
    );
    if (response.status == 200) {
      router.replace("account");
    }
  }

  return (
    <Container sm>
      <Card>
        <Card.Body>
          <Container>
            <Formik initialValues={initialValues} onSubmit={uploadArtwork}>
              {({ setFieldValue, values }) => (
                <Form>
                  {currentStep == 1 && (
                    <Col css={{ height: 350 }}>
                      <Text h3>Wpisz tytuł oraz opis swojego dzieła</Text>
                      <Input
                        underlined
                        fullWidth
                        borderWeight="light"
                        placeholder="Wpisz tytuł"
                        value={values.title}
                        onChange={(e) => {
                          setFieldValue("title", e.currentTarget.value);
                        }}
                      />
                      <Spacer y={1} />
                      <Input
                        underlined
                        fullWidth
                        borderWeight="light"
                        placeholder="Wprowadź opis (opcjonalne)"
                        value={values.description}
                        onChange={(e) => {
                          setFieldValue("description", e.currentTarget.value);
                        }}
                      />
                    </Col>
                  )}
                  {currentStep == 2 && (
                    <Col css={{ height: 350 }}>
                      <Text h3>Wybierz kategorię i gatunek</Text>
                      <Text h5>
                        Jeśli nie możesz znaleźć interesującej cię kategorii,
                        wpisz ją w tagach w następnym kroku.
                      </Text>
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          color="secondary"
                          css={{ tt: "capitalize" }}
                        >
                          {translate(+artType)}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label="select artType"
                          color="secondary"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={[artType]}
                          onAction={(key) => {
                            setArtType(key);
                            setGenre(genres[+artType][0]);
                            setFieldValue("artType", +key);
                          }}
                        >
                          <Dropdown.Item key={0}>Muzyka</Dropdown.Item>
                          <Dropdown.Item key={1}>Literatura</Dropdown.Item>
                          <Dropdown.Item key={2}>Fotografia</Dropdown.Item>
                          <Dropdown.Item key={3}>Inne</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Spacer y={1} />
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          color="secondary"
                          css={{ tt: "capitalize" }}
                        >
                          {genre}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          css={{ width: "100%" }}
                          aria-label="genre"
                          color="secondary"
                          disallowEmptySelection
                          selectionMode="single"
                          defaultSelectedKeys={genres[+artType][0]}
                          selectedKeys={[genre]}
                          onAction={(key: Key) => {
                            console.log(key);
                            setGenre(key);
                            setFieldValue("genres", [key]);
                          }}
                        >
                          {genres[+artType].map((genre) => (
                            <Dropdown.Item key={genre}>{genre}</Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  )}
                  {currentStep == 3 && (
                    <Col css={{ height: 350 }}>
                      <Text h3>Wpisz tagi</Text>
                      <Text h5>Ułatwią one wyszukiwanie twoich treści</Text>
                      <Spacer y={1} />
                      <Input
                        aria-label="tags"
                        fullWidth
                        bordered
                        placeholder="Tagi oddziel spacją"
                        onInput={(e: any) => {
                          let tags = parseTags(e);
                          setFieldValue("tags", tags);
                        }}
                      />
                      <Spacer y={1} />
                      <Text>
                        Wpisane tagi:{" "}
                        <Text>
                          {tags.map((tag, index) => (
                            <span key={index}>{`#${tag} `}</span>
                          ))}
                        </Text>
                      </Text>
                    </Col>
                  )}
                  {currentStep == 4 && (
                    <Col css={{ height: 350 }}>
                      <Text h3>Dołącz potrzebne pliki</Text>
                      {files.length != 0 && (
                        <Col>
                          {files.map((file, index) => (
                            <Text key={index}>{file.name}</Text>
                          ))}
                        </Col>
                      )}
                      <Spacer y={2} />
                      <Button
                        aria-label="add file"
                        ghost
                        onPress={doInputFileAction}
                      >
                        Wybierz plik
                      </Button>
                      <Input
                        aria-label="input file"
                        type="file"
                        hidden
                        ref={fileButton}
                        onChange={(e) => addFile(e)}
                      />
                    </Col>
                  )}
                  {currentStep == 5 && (
                    <Col css={{ height: 350 }}>
                      <Text h3>Twoje dzieło jest gotowe do publikacji</Text>
                      <Button type="submit">Opublikuj</Button>
                    </Col>
                  )}

                  <Spacer y={2} />
                  <Row justify="space-between">
                    <Button
                      disabled={currentStep == 1}
                      onPress={() => {
                        if (currentStep > 1) {
                          setCurrentStep(currentStep - 1);
                        }
                      }}
                    >
                      Wróć
                    </Button>
                    <Button
                      disabled={currentStep == 5}
                      onPress={() => {
                        if (currentStep < 5) {
                          setCurrentStep(currentStep + 1);
                        }
                      }}
                    >
                      Dalej
                    </Button>
                  </Row>
                  <Spacer y={1}></Spacer>
                  <Progress color="gradient" value={(currentStep - 1) * 25} />
                </Form>
              )}
            </Formik>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
