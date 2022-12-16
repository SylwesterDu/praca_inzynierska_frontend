"use client";
import {
  Card,
  Container,
  Text,
  Progress,
  Button,
  Row,
  Spacer,
  Col,
  Input,
  Dropdown,
} from "@nextui-org/react";
import { Key, useEffect, useMemo, useState } from "react";
export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [category, setCategory] = useState<Key>("music");
  const [genre, setGenre] = useState<Key>("");

  const genres: { [category: string]: string[] } = useMemo(() => {
    return {
      music: [
        "Pop",
        "Rap",
        "Rock/metal",
        "Instrumentalna",
        "Techno",
        "Jazz",
        "Reggae",
        "Folk",
        "Inny",
      ],
      literature: ["Wiersz", "Powieść", "Komiks", "Teksty piosenek", "Inne"],
      photography: [
        "Fotografia cyfrowa",
        "Grafika komputerowa",
        "Malarstwo",
        "Inne",
      ],
      other: [
        "Modelarstwo",
        "Żeźbiarstwo",
        "Wzory drukarek 3D",
        "Origami",
        "Inne",
      ],
    };
  }, []);

  useEffect(() => {
    setGenre(genres[category][0]);
  }, [category, genres]);

  function translate(categoryName: string) {
    switch (categoryName) {
      case "music":
        return "Muzyka";
      case "literature":
        return "literatura";
      case "photography":
        return "Fotografia";
      case "other":
        return "Inna";
      default:
        return "Muzyka";
    }
  }
  return (
    <Container sm>
      <Card>
        <Card.Body>
          <Container>
            {currentStep == 1 && (
              <>
                <Text h3>Wpisz tytuł oraz opis swojego dzieła</Text>
                <Input underlined fullWidth placeholder="Wpisz tytuł" />
                <Spacer y={1} />
                <Input
                  underlined
                  fullWidth
                  placeholder="Wprowadź opis (opcjonalne)"
                />
              </>
            )}
            {currentStep == 2 && (
              <>
                <Text h3>Wybierz kategorię i gatunek</Text>
                <Text h4>
                  Jeśli nie możesz znaleźć interesującej cię kategorii, wpisz ją
                  w tagach w następnym kroku.
                </Text>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color="secondary"
                    css={{ tt: "capitalize" }}
                  >
                    {translate(category.toString())}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="select category"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={[category]}
                    onAction={(key) => {
                      setCategory(key);
                      setGenre(genres[category][0]);
                    }}
                  >
                    <Dropdown.Item key="music">Muzyka</Dropdown.Item>
                    <Dropdown.Item key="literature">Literatura</Dropdown.Item>
                    <Dropdown.Item key="photography">Fotografia</Dropdown.Item>
                    <Dropdown.Item key="other">Inne</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Spacer y={1} />
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color="secondary"
                    css={{ tt: "capitalize" }}
                  >
                    {genre}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    css={{ width: "100%" }}
                    aria-label="Single selection actions"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    defaultSelectedKeys={genres[category][0]}
                    selectedKeys={[genre]}
                    onAction={setGenre}
                  >
                    {genres[category].map((genre) => (
                      <Dropdown.Item key={genre}>{genre}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
            {currentStep == 3 && (
              <>
                <Text h3>Wpisz tagi</Text>
              </>
            )}
            {currentStep == 4 && (
              <>
                <Text h3>Dołącz potrzebne pliki</Text>
              </>
            )}
            {currentStep == 5 && (
              <>
                <Text h3>Twoje dzieło jest gotowe do publikacji</Text>
              </>
            )}

            <Spacer y={2} />
            <Row justify="space-between">
              <Button
                disabled={currentStep == 1}
                onClick={() => {
                  if (currentStep > 1) {
                    setCurrentStep(currentStep - 1);
                  }
                }}
              >
                Wróć
              </Button>
              <Button
                disabled={currentStep == 5}
                onClick={() => {
                  if (currentStep < 5) {
                    setCurrentStep(currentStep + 1);
                  }
                }}
              >
                Dalej
              </Button>
            </Row>
            <Spacer y={1}></Spacer>
            <Progress color="gradient" value={(currentStep - 1) * 25} />
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
