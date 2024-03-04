#!/bin/bash
env > /tmp/env-variables.txt

pattern='^KEYCLOAK_URL'
pattern+='|^KEYCLOAK_REALM'
pattern+='|^KEYCLOAK_CLIENT_ID'
pattern+='|^FRONTEND_URL'
pattern+='|^BACKEND_URL'
grep -E "$pattern" /tmp/env-variables.txt > /usr/share/nginx/html/assets/variables.txt
