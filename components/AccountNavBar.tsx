import { Card, Image, Text, Button, Spacer } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { api } from "../axios";

export function AccountNavBar() {
  const router = useRouter();
  const path = usePathname();
  const [username, setUsername] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  let avatarUrl = useMemo(
    () =>
      "https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true",
    []
  );
  async function getUserData() {
    const repsonse = await api.get("user");
    setUsername(repsonse.data.username);
  }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    let spllittedPath = path!.split("/");
    setCurrentItem(spllittedPath![spllittedPath!.length - 1]);
  }, [path]);

  return (
    <Card css={{ width: 300, height: "auto" }}>
      <Card.Body>
        <Image
          width={320}
          height={180}
          src={avatarUrl}
          alt="avatar"
          objectFit="cover"
        />
        <Spacer y={1}></Spacer>
        <Text h3 css={{ textAlign: "center" }}>
          {username}
        </Text>

        <nav>
          <Button
            size="md"
            flat={currentItem != "my"}
            css={{ width: "100%" }}
            onPress={() => {
              router.replace("account/my");
            }}
          >
            Strona główna
          </Button>
          <Spacer y={4} />

          <Button
            size="md"
            flat={currentItem != "my-artworks"}
            color="success"
            css={{ width: "100%" }}
            onPress={() => {
              router.replace("account/my-artworks");
            }}
          >
            Moje dzieła
          </Button>
          <Spacer y={0.5} />

          <Button
            size="md"
            flat={currentItem != "stats"}
            color="secondary"
            css={{ width: "100%" }}
            onPress={() => {
              router.replace("account/stats");
            }}
          >
            Statystyki
          </Button>
          <Spacer y={0.5} />

          <Button
            size="md"
            flat={currentItem != "settings"}
            color="warning"
            css={{ width: "100%" }}
            onPress={() => {
              router.replace("account/settings");
            }}
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
  );
}
