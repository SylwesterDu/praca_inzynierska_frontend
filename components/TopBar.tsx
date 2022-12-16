"use client";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Link,
  Navbar,
  Text,
  User,
} from "@nextui-org/react";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../axios";
import { useAuth } from "../AuthContext";

export function TopBar() {
  const { user, login, logout } = useAuth();
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  function toggleSearch(value: boolean) {
    setShowSearchPanel(value);
  }

  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    login();
  }

  async function checkIfLogged() {
    if (localStorage.jwt != undefined) {
      console.log("get user data");
      const response = await api.get("user");
      setUsername(response.data.username);
    }
  }

  function logOff() {
    localStorage.removeItem("jwt");
    logout();
  }

  useEffect(() => {
    checkIfLogged();
  }, []);

  const router = useRouter();

  return (
    <>
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
            <Text>A basic card</Text>
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
          </Card.Body>
        </Card>
      )}
      <Navbar isBordered variant="sticky" css={{ position: "absolute" }}>
        <Navbar.Brand>
          <Text
            css={{ cursor: "pointer" }}
            b
            color="inherit"
            hideIn="xs"
            onClick={() => router.replace("/")}
          >
            Share Your Art!
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Input
            onClick={() => toggleSearch(true)}
            css={{ width: 600, minWidth: 400 }}
            placeholder="Wyszukaj"
            label=""
            fullWidth
            contentRight={
              <FontAwesomeIcon icon={faSearch} style={{ cursor: "pointer" }} />
            }
          ></Input>
        </Navbar.Content>
        {!user ? (
          <>
            <Navbar.Content>
              <Navbar.Link onClick={() => router.replace("login")}>
                Zaloguj się
              </Navbar.Link>
              <Navbar.Item>
                <Button onClick={() => router.replace("register")}>
                  Załóż konto
                </Button>
              </Navbar.Item>
            </Navbar.Content>
          </>
        ) : (
          <>
            <Dropdown>
              <Dropdown.Trigger css={{ cursor: "pointer" }}>
                <User src="" name={username}></User>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item key="account">
                  <Button
                    light
                    onClick={() => {
                      router.replace("account");
                    }}
                  >
                    Mój profil
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item withDivider key="logout" color="warning">
                  <Button light onClick={logOff}>
                    Wyloguj
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
      </Navbar>
    </>
  );
}
