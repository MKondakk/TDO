#!/bin/bash

response=$(curl -s http://localhost:8080)

if echo "$response" | grep -q "datetime"; then
  echo "Test Passed: Server responded with datetime"
else
  echo "Test Failed: Server response did not include datetime"
fi
