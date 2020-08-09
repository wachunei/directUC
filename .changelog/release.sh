#!/usr/bin/env bash
OUTPUT="$(yarn run --silent auto-changelog --stdout -t ./.changelog/release-template.hbs $@)"
echo "$OUTPUT"