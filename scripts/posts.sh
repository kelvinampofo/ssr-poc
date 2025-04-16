#!/bin/bash

API_URL="http://localhost:3000/api/posts"

print_help() {
  echo ""
  echo "Usage:"
  echo "  posts.sh list"
  echo "  posts.sh get <id>"
  echo "  posts.sh create <title> <content>"
  echo "  posts.sh update <id> <title> <content>"
  echo "  posts.sh delete <id>"
  echo ""
}

case "$1" in
  list)
    curl -s -X GET "$API_URL" | jq
    ;;
  get)
    if [ -z "$2" ]; then
      echo "❌ Please provide a post ID."
      print_help
      exit 1
    fi
    curl -s -X GET "$API_URL/$2" | jq
    ;;
  create)
    if [ -z "$2" ] || [ -z "$3" ]; then
      echo "❌ Please provide a title and content."
      print_help
      exit 1
    fi
    curl -s -X POST "$API_URL" \
      -H "Content-Type: application/json" \
      -d "{\"title\":\"$2\",\"content\":\"$3\"}" | jq
    ;;
  update)
    if [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]; then
      echo "❌ Please provide an ID, title, and content."
      print_help
      exit 1
    fi
    curl -s -X PUT "$API_URL/$2" \
      -H "Content-Type: application/json" \
      -d "{\"title\":\"$3\",\"content\":\"$4\"}" | jq
    ;;
  delete)
    if [ -z "$2" ]; then
      echo "❌ Please provide a post ID."
      print_help
      exit 1
    fi
    curl -s -X DELETE "$API_URL/$2" | jq
    ;;
  *)
    print_help
    ;;
esac