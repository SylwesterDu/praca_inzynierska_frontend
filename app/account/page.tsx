"use client";
import {
  Card,
  Text,
  Input,
  Row,
  Spacer,
  Button,
  Link,
  Container,
  Image,
} from "@nextui-org/react";
import { Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { api } from "../../axios";
import { MyAccount } from "../../components/MyAccount";
import { MyArtworks } from "../../components/MyArtworks";
import { Settings } from "../../components/Settings";
import { Stats } from "../../components/Stats";

export default function Page() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [currentMenuOption, setCurrentMenuOption] = useState<number>(1);

  async function getUserData() {
    const repsonse = await api.get("user");
    setUsername(repsonse.data.username);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container
      style={{
        width: "100%",
      }}
    >
      <Row>
        <Card css={{ width: 300, height: "auto" }}>
          <Card.Body>
            <Image
              width={320}
              height={180}
              src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
              alt="avatar"
              objectFit="cover"
            />
            <Text h3 css={{ textAlign: "center" }}>
              {username}
            </Text>

            <nav>
              <Button
                size="md"
                flat={currentMenuOption != 0}
                css={{ width: "100%" }}
                onClick={() => setCurrentMenuOption(0)}
              >
                Strona główna
              </Button>
              <Spacer y={4} />

              <Button
                size="md"
                flat={currentMenuOption != 1}
                color="success"
                css={{ width: "100%" }}
                onClick={() => setCurrentMenuOption(1)}
              >
                Moje dzieła
              </Button>
              <Spacer y={0.5} />

              <Button
                size="md"
                flat={currentMenuOption != 2}
                color="secondary"
                css={{ width: "100%" }}
                onClick={() => setCurrentMenuOption(2)}
              >
                Statystyki
              </Button>
              <Spacer y={0.5} />

              <Button
                size="md"
                flat={currentMenuOption != 3}
                color="warning"
                css={{ width: "100%" }}
                onClick={() => setCurrentMenuOption(3)}
              >
                Ustawienia
              </Button>
              <Spacer y={4} />
              <Button size="md" flat color="error" css={{ width: "100%" }}>
                Wyloguj
              </Button>
            </nav>
          </Card.Body>
        </Card>
        <Container>
          {currentMenuOption == 0 && <MyAccount />}
          {currentMenuOption == 1 && <MyArtworks />}
          {currentMenuOption == 2 && <Stats />}
          {currentMenuOption == 3 && <Settings />}
        </Container>
      </Row>
    </Container>
  );
}
