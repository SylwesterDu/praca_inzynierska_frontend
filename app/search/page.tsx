"use client";

import { Container, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../axios";
import { ArtworkCard } from "../../components/ArtworkCard";
import { Artwork } from "../../types/ArtworkTypes";
import { SearchParams } from "../../types/SearchTypes";

export default function Page(props: any) {
  const searchParams: SearchParams = props.searchParams;

  const [searchResult, setSearchResult] = useState<Artwork[]>([]);

  async function getSearchResult() {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("query", searchParams.query);
    if (searchParams.artType) {
      urlSearchParams.append("artType", searchParams.artType.toString());
    }
    if (searchParams.genre) {
      urlSearchParams.append("genre", searchParams.genre);
    }
    if (searchParams.tags) {
      urlSearchParams.append("tags", `${searchParams.tags}`);
    }
    const response = await api.get(`artwork?${urlSearchParams.toString()}`);
    setSearchResult(response.data);
  }

  useEffect(() => {
    getSearchResult();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.SearchParams]);

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
    if (artType == 3) {
      return "Inne";
    }
  }

  return (
    <Container>
      <Text h2>
        Wyniki wyszukiwania
        {searchParams.artType && (
          <Text
            span
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 80%",
            }}
          >
            {" "}
            {artTypeToName(searchParams.artType)}
          </Text>
        )}
      </Text>
      <Row>
        {searchResult.map((artwork) => (
          <Link
            key={artwork.id}
            style={{ marginRight: 20, marginBottom: 20 }}
            href={`artworks/${artwork.id}`}
          >
            <ArtworkCard data={artwork} userType="Spectator" />
          </Link>
        ))}
      </Row>
    </Container>
  );
}
