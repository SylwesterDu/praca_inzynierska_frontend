"use client";
import { Col, Container, Input, Spacer, Text } from "@nextui-org/react";
import { useAuth } from "../AuthContext";

export function Settings() {
  const { userData } = useAuth();

  return (
    <Container>
      <Text h2>Ustawienia</Text>
      <Col>
        <Spacer y={1} />
        <Input
          bordered
          borderWeight="light"
          label="Nazwa użytkownika"
          value={userData.username}
        />
      </Col>
    </Container>
  );
}
