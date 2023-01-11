"use client";

import {
  Button,
  Card,
  Container,
  Row,
  Spacer,
  Table,
  Text,
  Image,
  Col,
  StyledBadge,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { api } from "../../axios";

type Report = {
  reportId: string;
  artworkTitle: string;
  artworkId: string;
  reportReason: string;
  createdAt: string;
};

export default function Page() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);

  async function getReports() {
    const response = await api.get("report");
    setReports(response.data);
  }

  useEffect(() => {
    getReports();
  }, []);

  const columns = [
    {
      key: "title",
      label: "Tytuł",
    },
    {
      key: "reason",
      label: "Powód zgłoszenia",
    },
    {
      key: "actions",
      label: "Akcje do wykonania",
    },
  ];

  async function deleteArtwork(artworkId: string) {
    await api.delete(`artwork/${artworkId}`);
    getReports();
  }

  async function deleteReport(reportId: string) {
    await api.delete(`report/${reportId}`);
    getReports();
  }

  const renderCell = (item: Report, columnKey: Key) => {
    const cellValue = item[columnKey as keyof Report];
    switch (columnKey) {
      case "title":
        return (
          <Button light as={Link} href={`artworks/${item.artworkId}`}>
            {item.artworkTitle}
          </Button>
        );
      case "reason":
        return <Text>{item.reportReason}</Text>;

      case "actions":
        return (
          <div
            style={{
              width: 400,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Row align="flex-end">
              <Button
                light
                color="secondary"
                size="sm"
                as={Link}
                href={`artworks/${item.artworkId}/edit`}
              >
                Edytuj
              </Button>
              <Button
                light
                color="error"
                size="sm"
                onClick={() => deleteArtwork(item.artworkId)}
              >
                Usuń dzieło
              </Button>

              <Button
                light
                color="warning"
                size="sm"
                onClick={() => deleteReport(item.reportId)}
              >
                Usuń zgłoszenie
              </Button>
            </Row>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Container
      style={{
        width: "100%",
      }}
    >
      <Container>
        <Text h2>Zgłoszone dzieła</Text>

        <Table
          striped
          aria-label="Example table with dynamic content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column width={600} key={column.key}>
                <Text css={{ textAlign: "center" }}>{column.label}</Text>
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={reports}>
            {(item) => (
              <Table.Row key={item.reportId}>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    </Container>
  );
}
