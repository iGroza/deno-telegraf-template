#!/bin/bash

# Get OS and architecture
OS=$(uname -s)
ARCH=$(uname -m)

# Determine the correct executable based on OS and architecture
if [[ "$OS" == "Darwin" ]]; then
    # macOS
    if [[ "$ARCH" == "arm64" ]]; then
        EXECUTABLE="./bin/bot_macos_arm64"
    elif [[ "$ARCH" == "x86_64" ]]; then
        EXECUTABLE="./bin/bot_macos_x86_64"
    else
        echo "Unsupported architecture: $ARCH"
        exit 1
    fi
elif [[ "$OS" == "Linux" ]]; then
    # Linux
    if [[ "$ARCH" == "aarch64" ]]; then
        EXECUTABLE="./bin/bot_linux_arm64"
    elif [[ "$ARCH" == "x86_64" ]]; then
        EXECUTABLE="./bin/bot_linux_x86_64"
    else
        echo "Unsupported architecture: $ARCH"
        exit 1
    fi
elif [[ "$OS" == "MINGW"* ]] || [[ "$OS" == "MSYS"* ]] || [[ "$OS" == "CYGWIN"* ]]; then
    # Windows
    EXECUTABLE="./bin/bot_windows_x86_64.exe"
else
    echo "Unsupported operating system: $OS"
    exit 1
fi

# Check if the executable exists
if [[ ! -f "$EXECUTABLE" ]]; then
    echo "Executable not found: $EXECUTABLE"
    exit 1
fi

# Make the executable executable (in case it's not)
chmod +x "$EXECUTABLE"

# Run the executable
exec "$EXECUTABLE" "$@"
