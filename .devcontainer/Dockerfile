FROM node:18-bullseye-slim

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN DEBIAN_FRONTEND=noninteractive && apt-get update && apt-get -y install --no-install-recommends ca-certificates openssl git curl sudo bash bash-completion less nano unzip zip && \
    rm -rf /var/lib/apt/lists/*
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && ./aws/install && rm -r awscliv2.zip
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER node
WORKDIR /workspace
CMD ["/bin/bash"]
