"use client";

import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Image, Row, Text } from "@nextui-org/react";
import { Artwork } from "../types/ArtworkTypes";

export function ArtworkCard({ data }: { data: Artwork }) {
  return (
    <Card css={{ mw: 240, cursor: "pointer" }}>
      <Card.Body>
        <Image
          src="https://www.shutterstock.com/image-vector/music-notes-600w-464083592.jpg"
          alt="thumbnail"
          css={{ borderRadius: 5 }}
        />
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
    </Card>
  );
}
