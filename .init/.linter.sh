#!/bin/bash
cd /home/kavia/workspace/code-generation/school-management-system-50507-50517/sms_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

