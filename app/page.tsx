"use client";

import { Container, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { api } from "../axios";
import { PopularLiterature } from "../components/PopularLiterature";
import { PopularMusic } from "../components/PopularMusic";
import { PopularPhotography } from "../components/PopularPhotography";
import { Artwork } from "../types/ArtworkTypes";
export default function Page() {
  return (
    <main>
      <section>
        <PopularMusic />
        <PopularPhotography />
        <PopularLiterature />
      </section>
    </main>
  );
}
