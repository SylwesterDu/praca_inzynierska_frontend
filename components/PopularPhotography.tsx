import { Container, Loading, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../axios";
import { Artwork } from "../types/ArtworkTypes";
import { ArtworkCard } from "./ArtworkCard";

export function PopularPhotography() {
  const router = useRouter();
  const [popularPhotography, setPopularPhotography] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  async function getPopularPhotography() {
    setLoading(true);
    const response = await api.get("artwork/popular-photography");
    setPopularPhotography(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getPopularPhotography();
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
          Fotografia
        </Text>
      </Text>
      {loading ? (
        <Loading />
      ) : (
        <Row>
          {popularPhotography.map((artwork) => (
            <ArtworkCard key={artwork.id} data={artwork} userType="Spectator" />
          ))}
        </Row>
      )}
    </Container>
  );
}
