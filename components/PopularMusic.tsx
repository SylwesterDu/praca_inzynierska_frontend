"use client";
import { Container, Loading, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../axios";
import { Artwork } from "../types/ArtworkTypes";
import { ArtworkCard } from "./ArtworkCard";

export function PopularMusic() {
  const router = useRouter();
  const [popularMusic, setPopularMusic] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  async function getPopularMusic() {
    setLoading(true);
    const response = await api.get("artwork/popular-music");
    setPopularMusic(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getPopularMusic();
  }, []);

  return (
    <Container>
      <Text h2>
        Najpopularniejsze w kategorii:{" "}
        <Text
          span
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 80%",
          }}
        >
          Muzyka
        </Text>
      </Text>
      {loading ? (
        <Loading />
      ) : (
        <Row>
          {popularMusic.map((artwork) => (
            <ArtworkCard key={artwork.id} data={artwork} userType="Spectator" />
          ))}
        </Row>
      )}
    </Container>
  );
}
