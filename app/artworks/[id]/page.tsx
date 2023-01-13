"use client";
import {
  faFlag,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
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
  Badge,
  Button,
  Modal,
  Dropdown,
  Input,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

import { useEffect, useMemo, useState } from "react";

import { api } from "../../../axios";
import { ArtworkCard } from "../../../components/ArtworkCard";
import { Comments } from "../../../components/Comments";
import { Artwork, ArtworkDetails } from "../../../types/ArtworkTypes";

export default function Page({ params }: any) {
  const router = useRouter();
  const [artworkDetails, setArtworkDetails] = useState<ArtworkDetails>();
  const [otherArtworks, setOtherArtworks] = useState<Artwork[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reportForOther, setReportForOther] = useState(false);
  const [reportReason, setReportReason] = useState("Zła kategoria");
  const [showCustomReportReason, setShowCustomReportReason] = useState(false);
  const ratio = useMemo(() => {
    if (artworkDetails) {
      if (artworkDetails.upvotes == 0 && artworkDetails.downvotes > 0) {
        return 0;
      }
      return (
        ((artworkDetails!.upvotes + artworkDetails!.downvotes) /
          artworkDetails!.upvotes) *
        100
      );
    }
  }, [artworkDetails]);

  async function getArtworkDetails() {
    api
      .get(`artwork/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setArtworkDetails(response.data);
        return response.data.owner.id;
      })
      .then((ownerId: string) => {
        getOtherArtworks(ownerId);
      });
  }

  async function getOtherArtworks(ownerId: string) {
    const response = await api.get(`user/${ownerId}/artworks`);
    setOtherArtworks(
      response.data.filter((artwork: Artwork) => artwork.id != params.id)
    );
  }

  useEffect(() => {
    getArtworkDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function upvote() {
    await api.put(`artwork/${params.id}/upvote`);
    getArtworkDetails();
  }

  async function downvote() {
    await api.put(`artwork/${params.id}/downvote`);
    getArtworkDetails();
  }

  async function reportArtwork({ reportReason }: { reportReason: string }) {
    console.log(params.id);
    const response = await api.post(`artwork/${params.id}/report`, {
      reportReason: reportReason,
    });
    setShowModal(false);
  }

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Formik
          initialValues={{ reportReason: "Zła kategoria" }}
          onSubmit={reportArtwork}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Modal.Header>
                <Text id="modal-title" size={18}>
                  Zgłoś tę pracę
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Col>
                  <Text>Podaj powód zgłoszenia</Text>
                  <Dropdown>
                    <Dropdown.Button flat css={{ width: "100%" }}>
                      {showCustomReportReason ? "Inne" : reportReason}
                    </Dropdown.Button>
                    <Dropdown.Menu css={{ $$dropdownMenuWidth: "400px" }}>
                      <Dropdown.Item key="caytegory">
                        <Button
                          light
                          onClick={() => {
                            setReportReason("Zła kategoria");
                            setFieldValue("reportReason", "Zła kategoria");
                            setShowCustomReportReason(false);
                          }}
                        >
                          Zła kategoria
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item key="copyright">
                        <Button
                          light
                          onClick={() => {
                            setReportReason("Prawa autorskie");
                            setFieldValue("reportReason", "Prawa autorskie");

                            setShowCustomReportReason(false);
                          }}
                        >
                          Prawa autorskie
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item key="edit">
                        <Button
                          light
                          onClick={() => {
                            setReportReason("Treść nieodpowiednia dla dzieci");
                            setFieldValue(
                              "reportReason",
                              "Treść nieodpowiednia dla dzieci"
                            );

                            setShowCustomReportReason(false);
                          }}
                        >
                          Treść nieodpowiednia dla dzieci
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item key="other">
                        <Button
                          light
                          onClick={() => setShowCustomReportReason(true)}
                        >
                          Inne
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {showCustomReportReason && (
                    <>
                      <Spacer y={1} />
                      <Input
                        fullWidth
                        bordered
                        borderWeight="light"
                        placeholder="Wpisz powód zgłoszenia"
                        onChange={(e) =>
                          setFieldValue("reportReason", e.target.value)
                        }
                      />
                    </>
                  )}
                </Col>
              </Modal.Body>
              <Modal.Footer>
                <Button css={{ width: "100%" }} color="success" type="submit">
                  Wyślij
                </Button>
                <Button
                  css={{ width: "100%" }}
                  onPress={() => setShowModal(false)}
                >
                  Zamknij
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
      <Container>
        <Grid.Container gap={1}>
          <Grid md={8} sm={7} xs={12}>
            <div
              style={{
                height: 500,
                width: "100%",
                border: "1px solid #404040",
                borderRadius: 12,
              }}
            >
              {artworkDetails?.artType == 0 && (
                <Plyr
                  source={{
                    type: "video",
                    sources: [{ src: artworkDetails?.resourceUrls[0] }],
                  }}
                ></Plyr>
              )}
              {artworkDetails?.artType == 2 && (
                <Image
                  src={artworkDetails.resourceUrls[0]}
                  alt=""
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              )}
            </div>
          </Grid>
          <Grid md={4} sm={5} xs={12}>
            <Card>
              <Card.Header css={{ position: "relative" }}>
                <Text h3>{artworkDetails?.title}</Text>
                <span onClick={() => setShowModal(true)}>
                  <FontAwesomeIcon
                    color="grey"
                    style={{
                      fontSize: 16,
                      position: "absolute",
                      right: 10,
                      cursor: "pointer",
                    }}
                    icon={faFlag}
                  />
                </span>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <Text h5>Opis</Text>
                <Text>{artworkDetails?.description}</Text>
                <Spacer y={1} />
                {artworkDetails?.genres.map((genre) => (
                  <Badge color="success" key={genre} disableOutline>
                    {genre}
                  </Badge>
                ))}
              </Card.Body>
              <Row>
                <Grid.Container gap={1}>
                  {artworkDetails?.tags.map((tag) => (
                    <Grid key={tag}>
                      <Badge variant="flat" disableOutline>
                        #{tag}
                      </Badge>
                    </Grid>
                  ))}
                </Grid.Container>
              </Row>
              <Card.Divider />
              <Card.Footer>
                <Col>
                  <Grid.Container>
                    <Grid xs={5} sm={5} md={5} xl={5} lg={5}>
                      <Row justify="space-evenly">
                        <Row justify="center">
                          <span style={{ cursor: "pointer" }} onClick={upvote}>
                            <FontAwesomeIcon
                              color="green"
                              style={{ fontSize: 27 }}
                              icon={faThumbsUp}
                            />
                          </span>
                          <Text h4>&nbsp;{artworkDetails?.upvotes}</Text>
                        </Row>

                        <Row justify="center">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={downvote}
                          >
                            <FontAwesomeIcon
                              color="red"
                              style={{ fontSize: 27 }}
                              icon={faThumbsDown}
                            />
                          </span>
                          <Text h4>&nbsp;{artworkDetails?.downvotes}</Text>
                        </Row>
                      </Row>
                    </Grid>
                    <Grid xs={7} sm={7} md={7} xl={7} lg={7}>
                      <Text>
                        {isNaN(ratio!) ? (
                          "Brak ocen"
                        ) : (
                          <>
                            <span style={{ fontWeight: "bold" }}>
                              {ratio}% {` `}
                            </span>
                            {"pozytywnych ocen"}
                          </>
                        )}
                      </Text>
                    </Grid>
                  </Grid.Container>
                  <Text size="$sm" color="grey">
                    {artworkDetails?.views} wyświetleń.
                  </Text>
                  <Button
                    ghost
                    as={Link}
                    href={`user/${artworkDetails?.owner.id}`}
                    borderWeight="light"
                    color="gradient"
                    css={{ width: "100%" }}
                  >
                    Przejdź do profilu użytkownika{" "}
                    {artworkDetails?.owner.username}
                  </Button>
                </Col>
              </Card.Footer>
            </Card>
          </Grid>
        </Grid.Container>
        <Spacer y={1} />
        <Collapse title="Inne prace tego użytkownika" bordered>
          <Row wrap="wrap">
            {otherArtworks.map((artwork) => (
              <Link
                key={artwork.id}
                style={{ marginRight: 20 }}
                href={`artworks/${artwork.id}`}
              >
                <ArtworkCard data={artwork} userType="Spectator" />
              </Link>
            ))}
          </Row>
        </Collapse>
        <Spacer y={1} />
        <Comments artworkId={params.id} />
        <Spacer y={2} />
      </Container>
    </>
  );
}
