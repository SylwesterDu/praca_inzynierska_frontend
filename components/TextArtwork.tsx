"use client";
import { Container } from "@nextui-org/react";
import { ArtworkDetails } from "../types/ArtworkTypes";

import {
  Document,
  Page,
  pdfjs,
  Outline,
} from "react-pdf/dist/esm/entry.webpack5";
import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function TextArtwork(data: ArtworkDetails) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div
      style={{ height: 500, overflowY: "scroll", overflowX: "hidden" }}
      className="PdfDiv"
    >
      <Document file={data.resources[0].url}>
        <Page
          width={
            document.getElementsByClassName("PdfDiv")[0]?.clientWidth ?? 150
          }
          pageNumber={pageNumber}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
}
