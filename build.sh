#!/bin/sh

set -e

OUTFILE="number-extensions.min.js"

echo "Building $OUTFILE..."

npx esbuild src/number-extensions.js \
    --bundle \
    --minify \
    --platform=browser \
    --outfile="$OUTFILE"

echo "Done: $OUTFILE ($(wc -c < "$OUTFILE") bytes)"
