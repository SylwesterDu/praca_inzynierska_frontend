"use client";
import { Text, Container, Button, Row, Grid } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../axios";
import { Artwork } from "../types/ArtworkTypes";
import { ArtworkCard } from "./ArtworkCard";

export function MyArtworks() {
  const router = useRouter();
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  async function getUserArtworks() {
    const response = await api.get("user/artworks");
    setArtworks(response.data);
  }

  useEffect(() => {
    getUserArtworks();
  }, []);

  return (
    <>
      <Container>
        <Row justify="space-between">
          <Text h2>Moje dzieła</Text>
          <Button
            color="gradient"
            onClick={() => {
              router.replace("artworks/upload");
            }}
          >
            Dodaj
          </Button>
        </Row>
        {artworks.length == 0 && <Text h3>Nie dodałeś żadnych dzieł.</Text>}
        <Grid.Container gap={1}>
          {artworks.map((artwork) => (
            <Grid key={artwork.id} xs={3}>
              <ArtworkCard data={artwork} />
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </>
  );
}
