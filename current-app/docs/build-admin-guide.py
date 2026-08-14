#!/usr/bin/env python3
"""
Reproducible generator for the Qubix Admin, Operations & Disaster-Recovery Guide.

Source of truth: docs/qubix-admin-guide.src.html (edit that, not the PDF).
Output:          docs/QUBIX-ADMIN-GUIDE.pdf

Usage:
    pip install weasyprint            # one-time
    python3 docs/build-admin-guide.py

WeasyPrint turns the HTML/CSS into a paginated, A4 PDF. PDF bookmarks are
generated automatically from the h2/h3/h4 headings (bookmark-level in the CSS).
Document metadata is set below. Run from the repo root or the docs/ folder;
paths are resolved relative to this file.
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "qubix-admin-guide.src.html")
OUT = os.path.join(HERE, "QUBIX-ADMIN-GUIDE.pdf")

PDF_METADATA = {
    "title": "Qubix Admin, Operations & Disaster-Recovery Guide",
    "authors": ["Arcave Technologies"],
    "description": "Operator-grade reference for deploying, operating, and "
                   "recovering the Qubix platform. Production ref 2f3238f.",
    "keywords": ["Qubix", "Strata", "admin", "disaster recovery", "runbook",
                 "Supabase", "Vercel", "operations"],
}


def main():
    try:
        from weasyprint import HTML
    except ImportError:
        sys.exit("WeasyPrint not installed. Run: pip install weasyprint")

    if not os.path.exists(SRC):
        sys.exit(f"Source not found: {SRC}")

    doc = HTML(filename=SRC).render()

    # Attach metadata (WeasyPrint reads several from <meta>, but set explicitly
    # so the output is deterministic regardless of the HTML head).
    meta = doc.metadata
    meta.title = PDF_METADATA["title"]
    meta.authors = PDF_METADATA["authors"]
    meta.description = PDF_METADATA["description"]
    meta.keywords = PDF_METADATA["keywords"]
    meta.generator = "WeasyPrint via docs/build-admin-guide.py"

    # Accessibility: request PDF/UA-1, which produces a tagged (accessible) PDF
    # with a document structure tree. WeasyPrint 69 supports this via
    # pdf_variant. If the installed version does not, fall back to an untagged
    # PDF and report it, rather than failing the build.
    try:
        doc.write_pdf(OUT, pdf_variant="pdf/ua-1")
        tagged = True
    except TypeError:
        doc.write_pdf(OUT)
        tagged = False

    print(f"Wrote {OUT} ({len(doc.pages)} pages; "
          f"{'PDF/UA tagged' if tagged else 'untagged — PDF/UA unsupported by this WeasyPrint'})")


if __name__ == "__main__":
    main()
