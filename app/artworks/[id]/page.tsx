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
} from "@nextui-org/react";
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
  const [hasWindow, setHasWindow] = useState(false);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
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
      <Collapse title="Inne prace tego użytkownika" bordered>
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
      </Collapse>
      <Spacer y={1} />
      <Comments artworkId={params.id} />
      <Spacer y={2} />
    </Container>
  );
}
