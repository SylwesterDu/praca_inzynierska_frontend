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
import user from "@nextui-org/react/types/user";
import { Key } from "react";

type Report = {
  title: string;
  reason: string;
  id: string;
};

export default function Page() {
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
  const rows: Report[] = [
    {
      title: "title1",
      id: "345345",
      reason: "prawa autorskie",
    },
    {
      title: "title1",
      id: "345345",
      reason: "prawa autorskie",
    },
    {
      title: "title1",
      id: "345345",
      reason: "prawa autorskie",
    },
    {
      title: "title1",
      id: "345345",
      reason: "prawa autorskie",
    },
  ];

  const renderCell = (item: Report, columnKey: Key) => {
    const cellValue = item[columnKey as keyof Report];
    switch (columnKey) {
      case "title":
        return <Text>{item.title}</Text>;
      case "reason":
        return <Text>{item.reason}</Text>;

      case "actions":
        return (
          <div
            style={{
              width: 400,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Row css={{ width: 160 }} align="flex-end">
              <Button light color="warning" size="xs">
                Edytuj
              </Button>
              <Button light color="error" size="xs">
                Usuń
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
        <Card>
          <Card.Body>
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
              <Table.Body items={rows}>
                {(item) => (
                  <Table.Row key={item.title}>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}
