"use client";

import { Col, Container, Image, Row, Text } from "@nextui-org/react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useState } from "react";
import { Resource } from "../types/ArtworkTypes";

export function Gallery({ resources }: { resources: Resource[] }) {
  const [fileIndex, setFileIndex] = useState(0);
  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: "80%" }}>
        {resources[fileIndex].contentType.includes("image") ? (
          <Image
            src={resources[fileIndex].url}
            alt=""
            width={600}
            height="100%"
          />
        ) : (
          <div
            style={{ display: "flex", height: 390, justifyContent: "center" }}
          >
            <Plyr
              height={590}
              source={{
                type: "video",
                sources: [{ src: resources[fileIndex].url }],
              }}
            />
          </div>
        )}
      </div>
      <div
        style={{
          height: 98,
          backgroundColor: "rgb(5, 5, 5)",
          borderRadius: "0 0 10px 10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          overflow: "auto",
          padding: "0 5px",
        }}
      >
        {resources.map((resource, index) => (
          <span
            key={index}
            onClick={() => {
              setFileIndex(index);
            }}
            style={{ cursor: "pointer", width: 150 }}
          >
            {resource.contentType.includes("image") ? (
              <Image
                src={resource.url}
                alt=""
                width={160}
                containerCss={{ padding: "0 5px", margin: 0 }}
                css={{ padding: 0, margin: 0 }}
                height="100%"
              />
            ) : (
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "rgba(100,100,100, 0.2)",
                  height: 93,
                  marginTop: 2,
                  padding: "0 5px",
                }}
              >
                <Image src="/play.png" alt="play" width={50} height={50} />
              </div>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
