# TechRing Kasm Workspace Registry

Kasm Workspace Registry for TechRing SDR images.

## Available Workspaces

| Workspace | Description | Size |
|---|---|---|
| DragonOS SDR Desktop | Full SDR development and analysis environment | ~5.5 GB |

## Usage

### Add to Kasm Workspaces

1. Log in to Kasm admin panel
2. Navigate to **Workspaces** > **Workspace Registry**
3. Click **Add new**
4. Paste the registry URL:
   ```
   https://techring-live.github.io/kasm-registry/
   ```
5. Click **Add Registry**

The DragonOS SDR Desktop workspace will appear in the available workspaces list.

### Prerequisites

The Docker image is hosted on Harbor (`harbor.lab.techring.live`). You must add Harbor as a Docker Registry in Kasm before launching the workspace:

1. Navigate to **Infrastructure** > **Docker Registries**
2. Click **Add Registry**
3. Configure:
   - **Name**: `Harbor - DragonOS`
   - **Registry URL**: `https://harbor.lab.techring.live`
   - **Username/Password**: Service account credentials

## Registry URL

```
https://techring-live.github.io/kasm-registry/
```

## Discovery

KASM-REGISTRY-DISCOVERY-IDENTIFIER
