#!/bin/sh
OUTPUT=$(bwm-ng -o csv -c 1 -I wlo1)
curl -d "type=linux&payload=${OUTPUT}" -X POST http://localhost:3000