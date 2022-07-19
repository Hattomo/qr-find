FROM node:18-bullseye-slim

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN DEBIAN_FRONTEND=noninteractive && apt-get update && apt-get -y install --no-install-recommends ca-certificates openssl git curl sudo bash bash-completion less nano && \
    rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /workspace
CMD ["/bin/bash"]
