# Snapshot: jaothui-frontend Project Analysis

**Date**: 2026-01-11
**Project**: jaothui-frontend
**Type**: Web Application / DApp
**Path**: `projects/jaothui-frontend`

## Overview
`jaothui-frontend` is the official frontend application for the **Jaothui NFT** ecosystem. It serves as a comprehensive platform merging agricultural management (Buffalo Farms) with blockchain technology (NFTs, Certificates, Rewards). Ideally positioned as a **Web3 utility platform** for the Thai buffalo community.

## Tech Stack

### Core
- **Framework**: Next.js 14.0.3 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **State/Query**: React Query (@tanstack/react-query)

### Backend & Data
- **API Layer**: tRPC v10 (Type-safe API)
- **Database**: PostgreSQL (via Prisma ORM)
- **CMS**: Sanity (Headless CMS)
- **Storage/Auth**: Supabase (Client integration present)

### Blockchain (Web3)
- **Chain**: Bitkub Chain (Primary) & Ethereum/EVM compatible
- **Libraries**: 
  - `ethers` v5
  - `viem` (Type-safe Ethereum interactions)
  - `@rainbow-me/rainbowkit` (Wallet connection)
  - `@bitkub-blockchain/react-bitkubnext-oauth2` (Bitkub Next Wallet)

## Architecture

### Directory Structure
- `pages/`: Next.js routes (View layer).
- `blockchain/`: Contract ABIs and address configurations (JaothuiNFT, Metadata, Reward).
- `server/routers/`: tRPC procedure definitions (Business Logic).
  - Domains: `user`, `farm`, `buffalo`, `store`, `privilege`, `metadata`, `game`, `voteEvent`.
- `prisma/`: Database schema and migrations.
- `sanity/`: CMS schema and configuration.

### Key Domain Models (Prisma)
- **User**: Linked to Wallet Address, includes Geolocation (lat/lon), Roles (USER/ADMIN).
- **Farm**: Physical farm entities, linked to User.
- **MicrochipOrder**: Tracking hardware orders.
- **Certificate**: Digital certification, presumably linked to NFTs.

## Key Features
1.  **DApp Integration**: Connect Wallet (Bitkub Next, Metamask etc.), contract interactions for NFTs and Rewards.
2.  **Farm Management**: Users can register farms and manage buffalo data.
3.  **Governance/Voting**: `voteEventRouter` suggests community voting mechanisms.
4.  **Marketplace/Store**: `storeRouter` for item/NFT exchange.

## Observation/Patterns
- **Type Safety**: High focus on type safety with tRPC + Prisma + TypeScript.
- **Hybrid Auth**: Likely supports both Wallet login and traditional methods (or wallet-as-identity).
- **Rich Media**: Uses Sanity for content, implying a need for dynamic, editable content management outside of code.

## Next Recommendations
- **Audit**: Verify `env` variables and secret management for blockchain keys.
- **Migration Check**: Ensure `next-sanity` and `ethers` versions are compatible with current Next.js features.
