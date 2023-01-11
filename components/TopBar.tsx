"use client";
import {
  Button,
  Card,
  Dropdown,
  FormElement,
  Grid,
  Input,
  Navbar,
  Row,
  Spacer,
  Text,
  User,
} from "@nextui-org/react";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRef, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../axios";
import { useAuth } from "../AuthContext";
import Link from "next/link";
import { Form, Formik } from "formik";

type SearchParams = {
  query: string;
  category?: number;
  genre?: string;
  tags?: string[];
};

export function TopBar() {
  const { logged, userData, login, logout, getUserData } = useAuth();
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(true);
  const [searchCategory, setSearchCategory] = useState<number | null>(null);

  const searchButton = createRef<FormElement>();

  const genres: { [artType: number]: string[] } = useMemo(() => {
    return {
      0: [
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
      1: ["Wiersz", "Powieść", "Komiks", "Teksty piosenek", "Inne"],
      2: ["Fotografia cyfrowa", "Grafika komputerowa", "Malarstwo", "Inne"],
      3: ["Modelarstwo", "Żeźbiarstwo", "Wzory drukarek 3D", "Origami", "Inne"],
    };
  }, []);

  function toggleSearch(value: boolean) {
    setShowSearchPanel(value);
  }

  async function checkIfLogged() {
    if (localStorage.jwt != undefined) {
      login();
    }
  }

  function logOff() {
    localStorage.removeItem("jwt");
    logout();
  }

  useEffect(() => {
    checkIfLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialSearchParams: SearchParams = {
    query: "",
  };

  function search(params: SearchParams) {
    console.log(params);
  }

  return (
    <>
      <Formik initialValues={initialSearchParams} onSubmit={search}>
        {({ setFieldValue, values }) => (
          <Form>
            {showSearchPanel && (
              <Card
                css={{
                  position: "absolute",
                  top: 100,
                  margin: " 0 70px",
                  width: "calc(100% - 140px)",
                  zIndex: 1,
                }}
              >
                <Card.Body css={{ position: "relative" }}>
                  <Text h3>Co chcesz wyszukać?</Text>
                  <FontAwesomeIcon
                    onClick={() => toggleSearch(false)}
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      cursor: "pointer",
                    }}
                    icon={faXmark}
                  />
                  <Grid.Container alignContent="center" alignItems="center">
                    <Grid xs={3}>
                      <Text size="sm">Wybierz kategorię:</Text>
                    </Grid>
                    <Grid xs={9}>
                      <Button.Group color="gradient" ghost>
                        <Button
                          onClick={() => {
                            setSearchCategory(null),
                              setFieldValue("category", null);
                          }}
                        >
                          Brak
                        </Button>
                        <Button
                          onClick={() => {
                            setSearchCategory(0), setFieldValue("category", 0);
                          }}
                        >
                          Muzyka
                        </Button>
                        <Button
                          onClick={() => {
                            setSearchCategory(1), setFieldValue("category", 1);
                          }}
                        >
                          Literatura
                        </Button>
                        <Button
                          onClick={() => {
                            setSearchCategory(2), setFieldValue("category", 2);
                          }}
                        >
                          Fotografia
                        </Button>
                        <Button
                          onClick={() => {
                            setSearchCategory(3), setFieldValue("category", 3);
                          }}
                        >
                          Inne
                        </Button>
                      </Button.Group>
                    </Grid>

                    {searchCategory != null && (
                      <>
                        <Grid xs={3}>
                          <Text size="sm">Wybierz gatunek:</Text>
                        </Grid>
                        <Grid xs={9}>
                          <Button.Group color="gradient" ghost>
                            <Button
                              onClick={() => setFieldValue("genre", null)}
                            >
                              Brak
                            </Button>
                            {genres[searchCategory].map((genre) => (
                              <Button
                                key={genre}
                                onClick={() => setFieldValue("genre", genre)}
                              >
                                {genre}
                              </Button>
                            ))}
                          </Button.Group>
                        </Grid>
                      </>
                    )}
                    <Grid xs={3}>
                      <Text size="sm">Wpisz tagi</Text>
                    </Grid>
                    <Grid xs={4}>
                      <Spacer x={0.2} />
                      <Input
                        bordered
                        borderWeight="light"
                        fullWidth
                        placeholder="Wpisz listę #tagów"
                        onChange={(e) =>
                          setFieldValue(
                            "tags",
                            e.target.value
                              .split(" ")
                              .map((tag) => tag.replace("#", ""))
                          )
                        }
                      />
                    </Grid>
                  </Grid.Container>
                </Card.Body>
              </Card>
            )}
            <Navbar
              isBordered
              variant="floating"
              css={{ position: "absolute" }}
            >
              <Navbar.Brand>
                <Link aria-label="logo" href="/">
                  <Text
                    size="$lg"
                    css={{ cursor: "pointer" }}
                    b
                    color="inherit"
                    hideIn="xs"
                  >
                    Share Your Art!
                  </Text>
                </Link>
              </Navbar.Brand>
              <Navbar.Content hideIn="xs">
                <Button
                  type="submit"
                  ref={searchButton}
                  css={{ display: "none" }}
                ></Button>
                <Input
                  onClick={() => toggleSearch(true)}
                  css={{ minWidth: 400 }}
                  placeholder="Wyszukaj"
                  fullWidth
                  aria-label="search"
                  contentClickable
                  contentRight={
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        searchButton!.current?.click();
                      }}
                    />
                  }
                ></Input>
              </Navbar.Content>
              {!logged ? (
                <>
                  <Navbar.Content>
                    <Navbar.Item aria-label="zaloguj się">
                      <Link href="login">Zaloguj się</Link>
                    </Navbar.Item>
                    <Navbar.Item>
                      <Button aria-label="Zarejestruj się" href="register">
                        Załóż konto
                      </Button>
                    </Navbar.Item>
                  </Navbar.Content>
                </>
              ) : (
                <>
                  <Dropdown>
                    <Dropdown.Trigger css={{ cursor: "pointer" }}>
                      <User src="" name={userData.username}></User>
                    </Dropdown.Trigger>
                    <Dropdown.Menu>
                      <Dropdown.Item key="account">
                        <Button
                          as={Link}
                          aria-label="moje konto"
                          light
                          href="account"
                        >
                          Mój profil
                        </Button>
                      </Dropdown.Item>

                      {userData.roles.includes("admin") && (
                        <Dropdown.Item key="admin-panel">
                          <Button
                            as={Link}
                            aria-label="panel administratorski"
                            light
                            href={"admin"}
                          >
                            Panel administratorski
                          </Button>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item key="logout" withDivider color="error">
                        <Button
                          as={Link}
                          aria-label="moje konto"
                          light
                          href="account"
                        >
                          Wyloguj
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Navbar>
          </Form>
        )}
      </Formik>
    </>
  );
}
