"use client";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  Col,
  Collapse,
  Container,
  Divider,
  Grid,
  Row,
  Spacer,
  Text,
  Image,
  Input,
  Textarea,
  Dropdown,
  Button,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

import { Key, useEffect, useMemo, useState } from "react";

import { api } from "../../../../axios";
import {
  Artwork,
  ArtworkDetails,
  UpdateArtwork,
} from "../../../../types/ArtworkTypes";

export default function Page({ params }: any) {
  const router = useRouter();
  const [artworkDetails, setArtworkDetails] = useState<ArtworkDetails>();

  const [artType, setArtType] = useState<Key>(0);
  const [genre, setGenre] = useState<Key>("");
  const [tags, setTags] = useState<string[]>([]);
  const [parsedTags, setParsedTags] = useState<string>("");

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

  async function getArtworkDetails() {
    api.get(`artwork/${params.id}`).then((response) => {
      setArtworkDetails(response.data);
      setArtType(response.data.artType);
      setGenre(response.data.genres[0]);
      setTags(response.data.tags);
    });
  }

  useEffect(() => {
    getArtworkDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setParsedTags(tags.map((tag) => `#${tag}`).join(" "));
  }, [tags]);

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

  async function updateData(values: UpdateArtwork) {
    const response = await api.patch(`artwork/${params.id}`, values);
    if (response.status == 200) {
      router.replace(`artworks/${params.id}`);
    }
  }

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{
          title: artworkDetails?.title!,
          artType: artworkDetails?.artType!,
          description: artworkDetails?.description!,
          genres: artworkDetails?.genres ?? [""],
          tags: artworkDetails?.tags ?? [""],
        }}
        onSubmit={updateData}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Card>
              <Card.Body>
                <Grid.Container>
                  <Grid xs={12} md={6} lg={6} xl={6}>
                    <Container>
                      <Text h3>Tytuł</Text>
                      <Input
                        bordered
                        fullWidth
                        borderWeight="light"
                        initialValue={values.title}
                        onChange={(e) => {
                          setFieldValue("title", e.target.value);
                        }}
                      />
                      <Spacer y={1} />

                      <Text h3>Opis</Text>
                      <Textarea
                        bordered
                        fullWidth
                        borderWeight="light"
                        initialValue={values.description}
                        onChange={(e) => {
                          setFieldValue("description", e.target.value);
                        }}
                      />
                      <Spacer y={1} />
                    </Container>
                  </Grid>

                  <Grid xs={12} md={6} lg={6} xl={6}>
                    <Container>
                      <Text h3>Kategoria</Text>
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          color="secondary"
                          css={{ tt: "capitalize" }}
                        >
                          {translate(+artType)}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          color="secondary"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={[values.artType]}
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

                      <Text h3>Gatunek</Text>
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
                          selectedKeys={[values.genres[0]!]}
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
                      <Spacer y={1} />
                    </Container>
                  </Grid>

                  <Grid xs={12} md={6} lg={6} xl={6}>
                    <Container>
                      <Text h3>Wpisz tagi</Text>
                      <Text h5>Ułatwią one wyszukiwanie twoich treści</Text>
                      <Spacer y={1} />
                      <Input
                        initialValue={artworkDetails?.tags.join(" ")}
                        aria-label="tags"
                        fullWidth
                        bordered
                        value={values.tags.join(" ")}
                        placeholder="Tagi oddziel spacją"
                        onInput={(e: any) => {
                          let tags = parseTags(e);
                          setFieldValue("tags", tags);
                        }}
                      />
                      <Text>Wpisane tagi: {parsedTags}</Text>
                      <Spacer y={1} />
                    </Container>
                  </Grid>
                </Grid.Container>
                <Container>
                  <Button css={{ width: "100%" }} type="submit">
                    Zapisz zmiany
                  </Button>
                </Container>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
