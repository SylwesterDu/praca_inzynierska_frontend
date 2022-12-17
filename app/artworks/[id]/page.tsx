"use client";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  Col,
  Container,
  Divider,
  Grid,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../../axios";
import { ArtworkCard } from "../../../components/ArtworkCard";
import { Artwork, ArtworkDetails } from "../../../types/ArtworkTypes";

export default function Page({ params }: any) {
  const router = useRouter();
  const [artworkDetails, setArtworkDetails] = useState<ArtworkDetails>();
  const [otherArtworks, setOtherArtworks] = useState<Artwork[]>([]);
  const ratio = useMemo(() => {
    if (artworkDetails) {
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

  return (
    <Container>
      <Grid.Container gap={1}>
        <Grid md={8} sm={7} xs={12}>
          <div
            style={{ height: 500, width: "100%", border: "1px solid #404040" }}
          ></div>
        </Grid>
        <Grid md={4} sm={5} xs={12}>
          <Card>
            <Card.Header>
              <Text h3>{artworkDetails?.title}</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <Text h5>Opis</Text>
              <Text>{artworkDetails?.description}</Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Grid.Container>
                <Grid xs={5} sm={5} md={5} xl={5} lg={5}>
                  <Row justify="space-evenly">
                    <Row justify="center">
                      <FontAwesomeIcon
                        color="green"
                        style={{ fontSize: 27 }}
                        icon={faThumbsUp}
                      />
                      <Text h4>&nbsp;{artworkDetails?.upvotes}</Text>
                    </Row>

                    <Row justify="center">
                      <FontAwesomeIcon
                        color="red"
                        style={{ fontSize: 27 }}
                        icon={faThumbsDown}
                      />
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
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <Text h2>Inne dzieła użytkownika:</Text>
      <Row wrap="wrap">
        {otherArtworks.map((artwork) => (
          <div
            key={artwork.id}
            style={{ marginRight: 20 }}
            onClick={() => {
              router.replace(`artworks/${artwork.id}`);
            }}
          >
            <ArtworkCard data={artwork} />
          </div>
        ))}
      </Row>
    </Container>
  );
}
