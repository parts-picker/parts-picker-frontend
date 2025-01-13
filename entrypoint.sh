#!/bin/sh

# if this workaround is removed, sed does not need be installed in the docker file
echo "Manually setting the nextjs basePath with '$BASE_PATH', as it only supports configuring it on build time."
echo "This is a workaround and should be replaced when possible"

if [ -z "$BASE_PATH" ] || [ "$BASE_PATH" = "/" ] ; then
  replaceValue=""
else
  # check if BASE_PATH fulfills simple regex - might need an improvement in the future
  if ! [[ "$BASE_PATH" =~ "^(\/[A-Za-z0-9_.~-]+)+$" ]] ; then
    echo "BASE_PATH needs to match regex ^(\/[A-Za-z0-9_.~-]+)+, but was '$BASE_PATH'"
  	exit 1;
  fi
  replaceValue="$BASE_PATH"
fi

# Workaround to set the base path of the app dynamically
find .next \
  -type f \
  -exec sed -i \
  -e "s#\/\_\_BASE\_PATH\_PLACEHOLDER\_\_#$replaceValue#g" {} +

sed -i "s#\/\_\_BASE\_PATH\_PLACEHOLDER\_\_#$replaceValue#g" ./server.js

exec "$@"
