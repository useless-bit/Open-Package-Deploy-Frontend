#!/bin/bash
env > /tmp/env-variables.txt

pattern='^KEYCLOAK_URL'
pattern+='|^KEYCLOAK_REALM'
pattern+='|^KEYCLOAK_CLIENT_ID'
pattern+='|^TASKFLARE_FRONTEND_URL'
pattern+='|^TASKFLARE_BACKEND_URL'
grep -E "$pattern" /tmp/env-variables.txt > /usr/share/nginx/html/assets/variables.txt
