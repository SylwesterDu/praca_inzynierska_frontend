import { Container, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../axios";
import { Artwork } from "../types/ArtworkTypes";
import { ArtworkCard } from "./ArtworkCard";

export function PopularLiterature() {
  const router = useRouter();
  const [popularLiterature, setPopularLiterature] = useState<Artwork[]>([]);

  async function getPopularLiterature() {
    const response = await api.get("artwork/popular-literature");
    setPopularLiterature(response.data);
  }

  useEffect(() => {
    getPopularLiterature();
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
          Literatura
        </Text>
      </Text>
      <Row>
        {popularLiterature.map((artwork) => (
          <div
            key={artwork.id}
            style={{ marginRight: 20, marginBottom: 20 }}
            onClick={() => router.replace(`artworks/${artwork.id}`)}
          >
            <ArtworkCard data={artwork} userType="Spectator" />
          </div>
        ))}
      </Row>
    </Container>
  );
}
