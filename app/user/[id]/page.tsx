"use client";
import {
  Container,
  Text,
  Image,
  Grid,
  Badge,
  Col,
  Card,
  Spacer,
  Row,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../../axios";
import { ArtworkCard } from "../../../components/ArtworkCard";
import { Artwork } from "../../../types/ArtworkTypes";
import { UserData } from "../../../types/UserTypes";

export default function Page({ params }: any) {
  const id = params.id;

  const [userData, setUserData] = useState<UserData>();
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  async function getUserData() {
    const response = await api.get(`user/${id}`);
    setUserData(response.data);
  }

  async function getUserArtworks() {
    const response = await api.get(`user/${id}/artworks`);
    setArtworks(response.data);
  }

  useEffect(() => {
    getUserData();
    getUserArtworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function artTypeToName(artType: number) {
    if (artType == 0) {
      return "Muzyka";
    }
    if (artType == 1) {
      return "Literatura";
    }
    if (artType == 2) {
      return "Fotografia";
    }
    return "Inne";
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Container>
      <Card>
        <Card.Body>
          <Grid.Container>
            <Grid xs={3}>
              {userData?.avatar ? (
                <Image
                  width={220}
                  height={180}
                  src={userData?.avatar ?? ""}
                  alt="avatar"
                  objectFit="cover"
                  css={{ borderRadius: 10 }}
                />
              ) : null}
            </Grid>
            <Grid xs={3}>
              <Text h2>{userData?.username}</Text>
            </Grid>
            <Grid xs={6}>
              <Col>
                <Text h3>ilość dodanych dzieł:</Text>
                {userData?.stats.length != 0 ? (
                  <Grid.Container gap={0.5}>
                    {userData?.stats.map((count, index) => (
                      <Grid key={index} xs={12} alignItems="center">
                        <Badge
                          variant="dot"
                          css={{ backgroundColor: COLORS[index] }}
                        />
                        <Text css={{ ml: "$2" }}>
                          {artTypeToName(count.artType)} (
                          {userData?.stats[index].count})
                        </Text>
                      </Grid>
                    ))}
                  </Grid.Container>
                ) : (
                  <Text>ten twórca nie dodał żadnych dzieł.</Text>
                )}
              </Col>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>

      {userData?.stats.length != 0 && (
        <Container>
          <Spacer y={2} />
          <Text h3>Dodane dzieła:</Text>
          <Row>
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                data={artwork}
                userType="Spectator"
              />
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
}
