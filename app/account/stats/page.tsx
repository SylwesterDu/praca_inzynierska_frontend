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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";
import { api } from "../../../axios";
import { AccountNavBar } from "../../../components/AccountNavBar";

type LoginValues = {
  email: string;
  password: string;
};

export default function Page() {
  const router = useRouter();

  const { user, login, logout } = useAuth();

  return (
    <Container
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div style={{ height: 100 }}></div>
      <AccountNavBar />
    </Container>
  );
}
