"use client";

import {
  faThumbsUp,
  faThumbsDown,
  faDeleteLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Dropdown, Image, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createRef, useEffect, useState } from "react";
import { api } from "../axios";
import { Artwork } from "../types/ArtworkTypes";

export function ArtworkCard({
  data,
  userType,
  refreshParent,
}: {
  data: Artwork;
  userType: "Owner" | "Spectator";
  refreshParent?: any;
}) {
  const router = useRouter();

  const [thumbnailUrl, setThumbnailUrl] = useState(data.thumbnailUrl);

  useEffect(() => {
    if (data.artType == 0) {
      setThumbnailUrl(
        "https://www.shutterstock.com/image-vector/music-notes-600w-464083592.jpg"
      );
    } else if (data.artType == 1) {
      setThumbnailUrl(
        "https://storage.needpix.com/rsynced_images/book-1802861_1280.jpg"
      );
    }
  }, [data.artType]);

  async function deleteArtwork() {
    const response = await api.delete(`artwork/${data.id}`);
    if (response.status == 200) {
      refreshParent();
    }
  }

  return (
    <Card
      css={{ mw: 230, cursor: "pointer", marginRight: 20, marginBottom: 20 }}
    >
      <Link style={{}} href={`artworks/${data.id}`}>
        <Card.Body>
          <div style={{ height: 130 }}>
            <Image
              src={thumbnailUrl}
              alt="thumbnail"
              css={{ borderRadius: 5 }}
              height={130}
              objectFit="cover"
            />
          </div>
          <Text h5>{data.title}</Text>
          <Row justify="space-evenly">
            <Row justify="center">
              <FontAwesomeIcon
                color="green"
                style={{ fontSize: 27 }}
                icon={faThumbsUp}
              />
              <Text h4>&nbsp;{data.upvotes}</Text>
            </Row>

            <Row justify="center">
              <FontAwesomeIcon
                color="red"
                style={{ fontSize: 27 }}
                icon={faThumbsDown}
              />
              <Text h4>&nbsp;{data.downvotes}</Text>
            </Row>
          </Row>
          <Text color="grey">{`${data.views} wyświetleń`}</Text>
        </Card.Body>
      </Link>
      {userType == "Owner" && (
        <Dropdown>
          <Dropdown.Button css={{ width: 230 }} flat>
            Wykonaj akcję
          </Dropdown.Button>
          <Dropdown.Menu css={{ $$dropdownMenuWidth: "200px" }}>
            <Dropdown.Item key="new">
              <Button as={Link} href={`artworks/${data.id}/edit`} light>
                Edytuj
              </Button>
            </Dropdown.Item>

            <Dropdown.Item withDivider key="delete" color="error">
              <Button onClick={deleteArtwork} light>
                Usuń
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Card>
  );
}
