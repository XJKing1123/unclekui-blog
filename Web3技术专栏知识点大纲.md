# Web3 技术专栏知识点大纲

> 本大纲用于组织 Web3 深度技术文章，重点覆盖区块链协议、以太坊与 EVM、智能合约、钱包、DApp、DeFi、跨链、安全和生产工程。涉及链上参数、Gas、协议版本或网络状态时，应标注链、区块高度、合约版本和验证日期。

## 一、区块链基础

### 1. 分布式账本

- 区块
- 交易
- 状态
- Node
- Peer-to-peer Network
- Gossip
- Full Node
- Archive Node
- Light Client
- RPC Node
- Trust Assumption
- Byzantine Fault

### 2. 密码学基础

- Hash Function
- Preimage Resistance
- Collision Resistance
- Merkle Tree
- Merkle Proof
- Digital Signature
- Public / Private Key
- ECDSA
- EdDSA
- BLS Signature
- Threshold Signature
- Zero-knowledge Proof 概念
- 随机数与熵

### 3. 交易与最终性

- Transaction Lifecycle
- Mempool
- Nonce
- Block Inclusion
- Confirmation
- Reorganization
- Probabilistic Finality
- Economic Finality
- Transaction Replacement
- Dropped Transaction
- Finalized Block
- Chain-specific Finality

### 4. 共识

- Proof of Work
- Proof of Stake
- Validator
- Proposer
- Attestation
- Slashing
- Liveness
- Safety
- Fork Choice
- Finality Gadget
- MEV 与共识边界

## 二、以太坊架构

### 1. Ethereum 状态模型

- Account-based Model
- EOA
- Contract Account
- World State
- Storage
- Code
- Balance
- Nonce
- State Root
- Receipt Root
- Transaction Root

### 2. Execution 与 Consensus

- Execution Client
- Consensus Client
- Engine API
- Beacon Chain
- Slot
- Epoch
- Validator Duty
- Execution Payload
- Finality
- Client Diversity

### 3. Gas

- Gas Limit
- Gas Used
- Intrinsic Gas
- Base Fee
- Priority Fee
- Max Fee
- EIP-1559
- Gas Estimation
- Out of Gas
- Block Gas Limit
- Gas Refund
- Fee History

### 4. RPC

- JSON-RPC
- `eth_call`
- `eth_sendRawTransaction`
- `eth_getLogs`
- `eth_estimateGas`
- Block Tag
- `latest` / `safe` / `finalized`
- WebSocket Subscription
- Provider Rate Limit
- RPC Consistency
- Multi-provider Failover
- Archive Data

## 三、EVM

### 1. 执行模型

- Stack Machine
- Opcode
- Program Counter
- Call Frame
- Message Call
- Contract Creation
- Return Data
- Revert Data
- Execution Context
- Transaction Atomicity

### 2. EVM 数据区域

- Stack
- Memory
- Storage
- Calldata
- Returndata
- Code
- Transient Storage
- Logs
- Storage Slot
- Memory Expansion

### 3. 调用语义

- `CALL`
- `STATICCALL`
- `DELEGATECALL`
- `CALLCODE` 历史边界
- `CREATE`
- `CREATE2`
- `msg.sender`
- `msg.value`
- `tx.origin`
- Call Depth
- Gas Forwarding
- Reentrancy

### 4. ABI

- Function Selector
- ABI Encoding
- Static / Dynamic Type
- Tuple
- Event Topic
- Indexed Parameter
- Custom Error
- Revert Reason
- Packed Encoding
- Selector Collision

## 四、Solidity 基础

### 1. 类型系统

- Value Type
- Reference Type
- Mapping
- Array
- Struct
- Enum
- User-defined Value Type
- Address / Payable
- Fixed-size Bytes
- Function Type
- Data Location

### 2. 合约结构

- State Variable
- Constructor
- Function Visibility
- Mutability
- Modifier
- Event
- Error
- Receive
- Fallback
- Inheritance
- Interface
- Library

### 3. Storage Layout

- Slot Packing
- Mapping Slot
- Dynamic Array Slot
- Struct Layout
- Inheritance Layout
- Constant / Immutable
- Storage Pointer
- Upgrade Storage Compatibility
- Layout Inspection

### 4. 编译与部署

- `solc`
- Source Map
- Metadata
- Bytecode
- Creation Code
- Runtime Code
- Constructor Arguments
- Library Linking
- Contract Verification
- Compiler Optimizer
- `viaIR`
- Reproducible Build

## 五、智能合约设计

### 1. 权限模型

- Ownable
- Role-based Access Control
- Multisig
- Timelock
- Guardian
- Pausable
- Emergency Action
- Least Privilege
- Role Rotation
- Privileged Operation Audit

### 2. 状态机

- Explicit State
- Legal Transition
- Terminal State
- Timeout
- Cancellation
- Idempotency
- Replay Protection
- Pull over Push
- Checks-Effects-Interactions
- Invariant

### 3. Upgradeability

- Immutable Contract
- Proxy Pattern
- Transparent Proxy
- UUPS
- Beacon Proxy
- Diamond Pattern 边界
- Initializer
- Storage Collision
- Implementation Lock
- Upgrade Authorization
- Timelock Upgrade
- Migration

### 4. 标准与组合

- ERC Interface
- ERC-165
- ERC-20
- ERC-721
- ERC-1155
- ERC-2612 Permit
- ERC-4626 Vault
- ERC-1271
- ERC-2771
- ERC-4337
- 标准版本与扩展边界

## 六、智能合约安全

### 1. 常见漏洞

- Reentrancy
- Cross-function Reentrancy
- Access Control
- Integer / Precision
- Oracle Manipulation
- Flash Loan Amplification
- Front-running
- Sandwich Attack
- Signature Replay
- Arbitrary Call
- Unsafe Delegatecall
- Denial of Service
- Forced Ether
- Unchecked Return Value

### 2. 签名安全

- Domain Separation
- Chain ID
- Contract Address Binding
- Nonce
- Deadline
- EIP-191
- EIP-712
- Signature Malleability
- Contract Signature
- Cross-chain Replay
- Cross-contract Replay

### 3. Oracle 安全

- Spot Price
- TWAP
- Medianizer
- Staleness
- Heartbeat
- Decimal
- Deviation Threshold
- Sequencer Uptime Feed
- Multi-source Oracle
- Failure Mode

### 4. 审计方法

- Threat Modeling
- Trust Boundary
- Invariant
- Manual Review
- Static Analysis
- Symbolic Execution
- Fuzzing
- Differential Test
- Fork Test
- Formal Verification
- Audit Scope
- Remediation Verification

### 5. 应急响应

- Monitoring
- Pause
- Guardian
- Timelock Bypass 边界
- Key Compromise
- Incident Triage
- On-chain Communication
- User Notification
- Fund Recovery 边界
- Postmortem

## 七、钱包与账户

### 1. Key Management

- Seed Phrase
- BIP-32
- BIP-39
- BIP-44
- HD Wallet
- Derivation Path
- Keystore
- Hardware Wallet
- Secure Enclave / Keystore
- Key Backup
- Key Rotation 边界

### 2. Wallet Connection

- Injected Provider
- EIP-1193
- WalletConnect
- Session
- Namespace
- Chain Switching
- Account Change
- Disconnect
- Deep Link
- Mobile Wallet

### 3. Transaction Signing

- Legacy Transaction
- Typed Transaction
- EIP-1559 Transaction
- Nonce Management
- Gas Estimation
- Simulation
- Signing
- Broadcast
- Replacement
- Confirmation
- Reorg Handling

### 4. Account Abstraction

- Smart Account
- EntryPoint
- UserOperation
- Bundler
- Paymaster
- Aggregator
- Nonce
- Session Key
- Social Recovery
- Gas Sponsorship
- Validation / Execution
- ERC-4337 版本边界

## 八、DApp 前端

### 1. Web3 Provider 架构

- Transport
- HTTP / WebSocket
- Chain Configuration
- Public Client
- Wallet Client
- Signer
- Provider Fallback
- RPC Quorum
- Rate Limit
- Retry
- Request Deduplication

### 2. React 集成

- Wallet State
- Chain State
- Account State
- Contract Read
- Contract Write
- Query Cache
- Block-based Invalidation
- Optimistic UI
- Pending Transaction
- Receipt
- Reorg
- Error Boundary

### 3. 交易状态机

- Draft
- Simulating
- Awaiting Signature
- User Rejected
- Submitted
- Pending
- Replaced
- Confirmed
- Reverted
- Reorganized
- Finalized
- Dropped / Unknown

### 4. UX 与安全

- Human-readable Transaction
- Approval Scope
- Unlimited Approval
- Permit
- Network Mismatch
- Address Checksum
- ENS / Name Resolution
- Phishing Warning
- Signature Preview
- Clipboard Risk
- Transaction Simulation

## 九、事件、索引与数据层

### 1. Event Log

- Topic
- Data
- Filter
- Block Range
- Log Ordering
- Removed Log
- Reorg
- Event Schema
- Historical Backfill
- RPC Limit

### 2. Indexer

- Block Scanner
- Cursor
- Checkpoint
- Idempotent Consumer
- Confirmation Depth
- Reorg Rollback
- Backfill
- Live Sync
- Data Repair
- Index Lag

### 3. Subgraph 与索引平台

- Entity
- Mapping
- Manifest
- Deterministic Handler
- Block Handler
- Dynamic Data Source
- Query
- Hosted / Decentralized Indexing
- Schema Migration
- Availability Risk

### 4. 链上与链下事实源

- On-chain Source of Truth
- Materialized View
- Cache
- Eventual Consistency
- Read Model
- API Aggregation
- Data Provenance
- Verification
- Staleness
- Conflict

## 十、DeFi

### 1. Token

- ERC-20 Semantics
- Decimal
- Allowance
- Fee-on-transfer
- Rebasing Token
- Wrapped Token
- Native Token
- Non-standard Return Value
- Token List
- Malicious Token

### 2. AMM

- Constant Product
- Liquidity Pool
- LP Token
- Price Impact
- Slippage
- Fee
- Impermanent Loss
- Concentrated Liquidity
- Tick
- Range Position

### 3. Lending

- Deposit
- Borrow
- Collateral Factor
- Health Factor
- Interest Rate Model
- Liquidation
- Bad Debt
- Oracle
- Isolation Mode
- Flash Loan

### 4. Vault 与收益

- Share Accounting
- Exchange Rate
- Deposit / Withdraw
- Inflation Attack
- Donation Attack
- Rounding
- Strategy
- Harvest
- Performance Fee
- ERC-4626

### 5. 稳定币

- Fiat-backed
- Crypto-collateralized
- Algorithmic 边界
- Peg
- Redemption
- Liquidation
- Reserve Proof
- Depeg Risk
- Oracle Risk

## 十一、NFT 与数字资产

### 1. NFT 标准

- ERC-721
- ERC-1155
- Metadata
- `tokenURI`
- Enumerable
- Royalty
- Soulbound 边界
- Dynamic NFT
- On-chain Metadata

### 2. Metadata 与存储

- HTTP
- IPFS
- Content Addressing
- Arweave
- Gateway
- Pinning
- Mutable Metadata
- Reveal
- Media Integrity
- Availability

### 3. Marketplace

- Listing
- Offer
- Auction
- Signature Order
- Cancellation
- Nonce
- Fee
- Royalty
- Transfer Approval
- Settlement
- Wash Trading

## 十二、Layer 2 与扩容

### 1. Rollup 基础

- Execution
- Sequencer
- Batch
- Data Availability
- State Root
- Bridge
- Withdrawal
- Finality
- Forced Inclusion

### 2. Optimistic Rollup

- Fraud Proof
- Challenge Period
- Fault Proof
- Withdrawal Delay
- Sequencer Risk
- L1 Data

### 3. ZK Rollup

- Validity Proof
- Prover
- Verifier
- Circuit
- Proof Aggregation
- Data Availability
- EVM Compatibility
- Proving Cost

### 4. 多链差异

- Chain ID
- Native Token
- Fee Model
- Finality
- RPC Semantics
- Precompile
- Address Aliasing
- L1/L2 Message
- Upgrade Governance

## 十三、跨链与桥

### 1. 跨链模型

- Lock and Mint
- Burn and Mint
- Liquidity Network
- Canonical Bridge
- Third-party Bridge
- Message Passing
- Light Client Bridge
- Validator / Multisig Bridge

### 2. 跨链状态机

- Source Submitted
- Source Finalized
- Message Relayed
- Destination Executed
- Failed
- Retry
- Refund
- Duplicate Message
- Replay Protection

### 3. 跨链风险

- Finality Mismatch
- Validator Compromise
- Proof Verification Bug
- Replay
- Message Ordering
- Liquidity Risk
- Wrapped Asset Risk
- Upgrade Key
- Rate Limit
- Emergency Pause

## 十四、MEV 与交易供应链

### 1. MEV 基础

- Searcher
- Builder
- Relay
- Proposer
- Arbitrage
- Liquidation
- Sandwich
- Back-running
- Censorship
- Private Transaction

### 2. 用户保护

- Slippage Limit
- Deadline
- Minimum Output
- Transaction Simulation
- Private RPC
- Batch Auction
- Intent
- Commit-reveal
- MEV Protection 边界

## 十五、测试与开发工具

### 1. 本地开发

- Foundry
- Hardhat
- Anvil
- Local Node
- Mainnet Fork
- Impersonation
- Time / Block Manipulation
- Snapshot / Revert
- Deterministic Deployment

### 2. 单元与集成测试

- Happy Path
- Revert
- Event
- Access Control
- Boundary Value
- Time-dependent Logic
- Multi-user Scenario
- Fork Integration
- Gas Snapshot

### 3. Fuzz 与 Invariant

- Property-based Test
- Stateful Fuzzing
- Invariant Handler
- Input Bound
- Ghost Variable
- Shrinking
- Seed Reproduction
- Coverage

### 4. DApp 测试

- Mock Provider
- Local Chain
- Wallet Automation
- Transaction Rejection
- Chain Switch
- Pending / Replaced Transaction
- Reorg Simulation
- RPC Failure
- E2E

## 十六、部署与工程化

### 1. 部署流程

- Environment
- Chain Configuration
- Deployer
- Nonce
- CREATE2
- Deployment Script
- Verification
- Ownership Transfer
- Role Setup
- Timelock
- Smoke Test

### 2. 配置治理

- Contract Address Registry
- Chain ID
- ABI Version
- Feature Flag
- RPC Endpoint
- Explorer URL
- Token Metadata
- Deployment Manifest
- Configuration Signature

### 3. CI/CD

- Compile
- Format
- Lint
- Unit Test
- Fuzz Test
- Invariant Test
- Static Analysis
- Gas Report
- Storage Layout Diff
- Fork Test
- Verification
- Release Approval

### 4. Upgrade 发布

- Proposal
- Simulation
- Storage Compatibility
- Timelock
- Multisig Approval
- On-chain Execution
- Post-upgrade Validation
- Roll-forward
- Emergency Response
- 不可逆变更边界

## 十七、可观测性与运维

### 1. 链上监控

- Event Monitor
- Balance
- Role Change
- Upgrade
- Pause
- Oracle Staleness
- Price Deviation
- TVL
- Health Factor
- Failed Transaction

### 2. 基础设施监控

- RPC Availability
- RPC Latency
- Rate Limit
- Indexer Lag
- Reorg Depth
- Mempool
- Relayer Balance
- Relayer Nonce
- Queue Depth
- Provider Divergence

### 3. 告警与响应

- Severity
- Runbook
- On-call
- Alert Deduplication
- Confirmation
- Automated Pause 边界
- Multisig Coordination
- Evidence Preservation
- Postmortem

## 十八、性能与成本

### 1. Gas 优化

- Storage Read / Write
- Calldata
- Memory
- Packing
- Custom Error
- Immutable
- Loop Bound
- Batch
- Event vs Storage
- Optimizer Trade-off
- Readability and Auditability

### 2. RPC 性能

- Batch Request
- Multicall
- Cache
- Request Deduplication
- Block-pinned Read
- Pagination
- Log Range
- WebSocket Backpressure
- Provider Failover

### 3. DApp 性能

- Wallet Connection
- Chain Switch
- Contract Read Waterfall
- Query Cache
- Optimistic UI
- Bundle Size
- SSR 边界
- Web Vitals

## 十九、治理与 DAO

### 1. 治理模型

- Token Voting
- Delegation
- Quorum
- Proposal Threshold
- Timelock
- Snapshot Voting
- On-chain Execution
- Guardian
- Veto
- Emergency Governance

### 2. 治理攻击

- Flash-loan Voting
- Vote Buying
- Delegation Capture
- Low Participation
- Proposal Spam
- Malicious Upgrade
- Governance Extractable Value
- Social Layer

## 二十、系统设计主题

### 1. 安全 DApp 交易流

- Wallet Session
- Network Validation
- Simulation
- Human-readable Intent
- Gas
- Signature
- Broadcast
- Replacement
- Confirmation
- Reorg

### 2. DeFi 协议

- Contract Invariant
- Oracle
- Liquidation
- Upgrade
- Monitoring
- Emergency Control
- Economic Attack

### 3. NFT Marketplace

- Off-chain Order
- Signature
- Indexer
- Settlement
- Cancellation
- Royalty
- Metadata Availability

### 4. 跨链应用

- Multi-chain State
- Bridge
- Finality
- Retry
- Idempotency
- Reconciliation
- User-facing Status

### 5. Web2 + Web3 混合系统

- Authentication
- Wallet Binding
- Off-chain Database
- On-chain Settlement
- Indexer
- Cache
- Data Verification
- Privacy
- Compliance
