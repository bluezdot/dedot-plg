// Generated by dedot cli

import type { GenericChainConsts, RpcVersion } from "dedot/types";
import type { RuntimeVersion } from "dedot/codecs";
import type {
  FrameSystemLimitsBlockWeights,
  FrameSystemLimitsBlockLength,
  SpWeightsRuntimeDbWeight,
  SpWeightsWeightV2Weight,
  FrameSupportPalletId,
} from "./types";

export interface ChainConsts<Rv extends RpcVersion>
  extends GenericChainConsts<Rv> {
  /**
   * Pallet `System`'s constants
   **/
  system: {
    /**
     * Block & extrinsics weights: base values and limits.
     **/
    blockWeights: FrameSystemLimitsBlockWeights;

    /**
     * The maximum length of a block (in bytes).
     **/
    blockLength: FrameSystemLimitsBlockLength;

    /**
     * Maximum number of block number to block hash mappings to keep (oldest pruned first).
     **/
    blockHashCount: number;

    /**
     * The weight of runtime database operations the runtime can invoke.
     **/
    dbWeight: SpWeightsRuntimeDbWeight;

    /**
     * Get the chain's in-code version.
     **/
    version: RuntimeVersion;

    /**
     * The designated SS58 prefix of this chain.
     *
     * This replaces the "ss58Format" property declared in the chain spec. Reason is
     * that the runtime should know about the prefix in order to make use of it as
     * an identifier of the chain.
     **/
    ss58Prefix: number;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `RandomnessCollectiveFlip`'s constants
   **/
  randomnessCollectiveFlip: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Timestamp`'s constants
   **/
  timestamp: {
    /**
     * The minimum period between blocks.
     *
     * Be aware that this is different to the *expected* period that the block production
     * apparatus provides. Your chosen consensus system will generally work with this to
     * determine a sensible block time. For example, in the Aura pallet it will be double this
     * period on default settings.
     **/
    minimumPeriod: bigint;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Aura`'s constants
   **/
  aura: {
    /**
     * The slot duration Aura should run with, expressed in milliseconds.
     * The effective value of this type should not change while the chain is running.
     *
     * For backwards compatibility either use [`MinimumPeriodTimesTwo`] or a const.
     **/
    slotDuration: bigint;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Grandpa`'s constants
   **/
  grandpa: {
    /**
     * Max Authorities in use
     **/
    maxAuthorities: number;

    /**
     * The maximum number of nominators for each validator.
     **/
    maxNominators: number;

    /**
     * The maximum number of entries to keep in the set id to session index mapping.
     *
     * Since the `SetIdSession` map is only used for validating equivocations this
     * value should relate to the bonding duration of whatever staking system is
     * being used (if any). If equivocation handling is not enabled then this value
     * can be zero.
     **/
    maxSetIdSessionEntries: bigint;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Balances`'s constants
   **/
  balances: {
    /**
     * The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
     *
     * If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
     * this pallet. However, you do so at your own risk: this will open up a major DoS vector.
     * In case you have multiple sources of provider references, you may also get unexpected
     * behaviour if you set this to zero.
     *
     * Bottom line: Do yourself a favour and make it at least one!
     **/
    existentialDeposit: bigint;

    /**
     * The maximum number of locks that should exist on an account.
     * Not strictly enforced, but used for weight estimation.
     *
     * Use of locks is deprecated in favour of freezes. See `https://github.com/paritytech/substrate/pull/12951/`
     **/
    maxLocks: number;

    /**
     * The maximum number of named reserves that can exist on an account.
     *
     * Use of reserves is deprecated in favour of holds. See `https://github.com/paritytech/substrate/pull/12951/`
     **/
    maxReserves: number;

    /**
     * The maximum number of individual freeze locks that can exist on an account at any time.
     **/
    maxFreezes: number;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `TransactionPayment`'s constants
   **/
  transactionPayment: {
    /**
     * A fee multiplier for `Operational` extrinsics to compute "virtual tip" to boost their
     * `priority`
     *
     * This value is multiplied by the `final_fee` to obtain a "virtual tip" that is later
     * added to a tip component in regular `priority` calculations.
     * It means that a `Normal` transaction can front-run a similarly-sized `Operational`
     * extrinsic (with no tip), by including a tip value greater than the virtual tip.
     *
     * ```rust,ignore
     * // For `Normal`
     * let priority = priority_calc(tip);
     *
     * // For `Operational`
     * let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
     * let priority = priority_calc(tip + virtual_tip);
     * ```
     *
     * Note that since we use `final_fee` the multiplier applies also to the regular `tip`
     * sent with the transaction. So, not only does the transaction get a priority bump based
     * on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
     * transactions.
     **/
    operationalFeeMultiplier: number;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `SubtensorModule`'s constants
   **/
  subtensorModule: {
    /**
     * =================================
     * ==== Initial Value Constants ====
     * =================================
     * Initial currency issuance.
     **/
    initialIssuance: bigint;

    /**
     * Initial min allowed weights setting.
     **/
    initialMinAllowedWeights: number;

    /**
     * Initial Emission Ratio.
     **/
    initialEmissionValue: number;

    /**
     * Initial max weight limit.
     **/
    initialMaxWeightsLimit: number;

    /**
     * Tempo for each network.
     **/
    initialTempo: number;

    /**
     * Initial Difficulty.
     **/
    initialDifficulty: bigint;

    /**
     * Initial Max Difficulty.
     **/
    initialMaxDifficulty: bigint;

    /**
     * Initial Min Difficulty.
     **/
    initialMinDifficulty: bigint;

    /**
     * Initial RAO Recycled.
     **/
    initialRAORecycledForRegistration: bigint;

    /**
     * Initial Burn.
     **/
    initialBurn: bigint;

    /**
     * Initial Max Burn.
     **/
    initialMaxBurn: bigint;

    /**
     * Initial Min Burn.
     **/
    initialMinBurn: bigint;

    /**
     * Initial adjustment interval.
     **/
    initialAdjustmentInterval: number;

    /**
     * Initial bonds moving average.
     **/
    initialBondsMovingAverage: bigint;

    /**
     * Initial bonds penalty.
     **/
    initialBondsPenalty: number;

    /**
     * Initial bonds reset.
     **/
    initialBondsResetOn: boolean;

    /**
     * Initial target registrations per interval.
     **/
    initialTargetRegistrationsPerInterval: number;

    /**
     * Rho constant.
     **/
    initialRho: number;

    /**
     * AlphaSigmoidSteepness constant.
     **/
    initialAlphaSigmoidSteepness: number;

    /**
     * Kappa constant.
     **/
    initialKappa: number;

    /**
     * Max UID constant.
     **/
    initialMaxAllowedUids: number;

    /**
     * Initial validator context pruning length.
     **/
    initialValidatorPruneLen: bigint;

    /**
     * Initial scaling law power.
     **/
    initialScalingLawPower: number;

    /**
     * Immunity Period Constant.
     **/
    initialImmunityPeriod: number;

    /**
     * Activity constant.
     **/
    initialActivityCutoff: number;

    /**
     * Initial max registrations per block.
     **/
    initialMaxRegistrationsPerBlock: number;

    /**
     * Initial pruning score for each neuron.
     **/
    initialPruningScore: number;

    /**
     * Initial maximum allowed validators per network.
     **/
    initialMaxAllowedValidators: number;

    /**
     * Initial default delegation take.
     **/
    initialDefaultDelegateTake: number;

    /**
     * Initial minimum delegation take.
     **/
    initialMinDelegateTake: number;

    /**
     * Initial default childkey take.
     **/
    initialDefaultChildKeyTake: number;

    /**
     * Initial minimum childkey take.
     **/
    initialMinChildKeyTake: number;

    /**
     * Initial maximum childkey take.
     **/
    initialMaxChildKeyTake: number;

    /**
     * Initial weights version key.
     **/
    initialWeightsVersionKey: bigint;

    /**
     * Initial serving rate limit.
     **/
    initialServingRateLimit: bigint;

    /**
     * Initial transaction rate limit.
     **/
    initialTxRateLimit: bigint;

    /**
     * Initial delegate take transaction rate limit.
     **/
    initialTxDelegateTakeRateLimit: bigint;

    /**
     * Initial childkey take transaction rate limit.
     **/
    initialTxChildKeyTakeRateLimit: bigint;

    /**
     * Initial percentage of total stake required to join senate.
     **/
    initialSenateRequiredStakePercentage: bigint;

    /**
     * Initial adjustment alpha on burn and pow.
     **/
    initialAdjustmentAlpha: bigint;

    /**
     * Initial network immunity period
     **/
    initialNetworkImmunityPeriod: bigint;

    /**
     * Initial minimum allowed network UIDs
     **/
    initialNetworkMinAllowedUids: number;

    /**
     * Initial network minimum burn cost
     **/
    initialNetworkMinLockCost: bigint;

    /**
     * Initial network subnet cut.
     **/
    initialSubnetOwnerCut: number;

    /**
     * Initial lock reduction interval.
     **/
    initialNetworkLockReductionInterval: bigint;

    /**
     * Initial network creation rate limit
     **/
    initialNetworkRateLimit: bigint;

    /**
     * Cost of swapping a hotkey.
     **/
    keySwapCost: bigint;

    /**
     * The upper bound for the alpha parameter. Used for Liquid Alpha.
     **/
    alphaHigh: number;

    /**
     * The lower bound for the alpha parameter. Used for Liquid Alpha.
     **/
    alphaLow: number;

    /**
     * A flag to indicate if Liquid Alpha is enabled.
     **/
    liquidAlphaOn: boolean;

    /**
     * Coldkey swap schedule duartion.
     **/
    initialColdkeySwapScheduleDuration: number;

    /**
     * Coldkey swap reschedule duration.
     **/
    initialColdkeySwapRescheduleDuration: number;

    /**
     * Dissolve network schedule duration
     **/
    initialDissolveNetworkScheduleDuration: number;

    /**
     * Initial TAO weight.
     **/
    initialTaoWeight: bigint;

    /**
     * Initial EMA price halving period
     **/
    initialEmaPriceHalvingPeriod: bigint;

    /**
     * Block number after a new subnet accept the start call extrinsic.
     **/
    durationOfStartCall: bigint;

    /**
     * Cost of swapping a hotkey in a subnet.
     **/
    keySwapOnSubnetCost: bigint;

    /**
     * Block number for a coldkey swap the hotkey in specific subnet.
     **/
    hotkeySwapOnSubnetInterval: bigint;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Triumvirate`'s constants
   **/
  triumvirate: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `TriumvirateMembers`'s constants
   **/
  triumvirateMembers: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `SenateMembers`'s constants
   **/
  senateMembers: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Utility`'s constants
   **/
  utility: {
    /**
     * The limit on the number of batched calls.
     **/
    batchedCallsLimit: number;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Sudo`'s constants
   **/
  sudo: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Multisig`'s constants
   **/
  multisig: {
    /**
     * The base amount of currency needed to reserve for creating a multisig execution or to
     * store a dispatch call for later.
     *
     * This is held for an additional storage item whose value size is
     * `4 + sizeof((BlockNumber, Balance, AccountId))` bytes and whose key size is
     * `32 + sizeof(AccountId)` bytes.
     **/
    depositBase: bigint;

    /**
     * The amount of currency needed per unit threshold when creating a multisig execution.
     *
     * This is held for adding 32 bytes more into a pre-existing storage value.
     **/
    depositFactor: bigint;

    /**
     * The maximum amount of signatories allowed in the multisig.
     **/
    maxSignatories: number;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Preimage`'s constants
   **/
  preimage: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Scheduler`'s constants
   **/
  scheduler: {
    /**
     * The maximum weight that may be scheduled per block for any dispatchables.
     **/
    maximumWeight: SpWeightsWeightV2Weight;

    /**
     * The maximum number of scheduled calls in the queue for a single block.
     *
     * NOTE:
     * + Dependent pallets' benchmarks might require a higher limit for the setting. Set a
     * higher limit under `runtime-benchmarks` feature.
     **/
    maxScheduledPerBlock: number;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Proxy`'s constants
   **/
  proxy: {
    /**
     * The base amount of currency needed to reserve for creating a proxy.
     *
     * This is held for an additional storage item whose value size is
     * `sizeof(Balance)` bytes and whose key size is `sizeof(AccountId)` bytes.
     **/
    proxyDepositBase: bigint;

    /**
     * The amount of currency needed per proxy added.
     *
     * This is held for adding 32 bytes plus an instance of `ProxyType` more into a
     * pre-existing storage value. Thus, when configuring `ProxyDepositFactor` one should take
     * into account `32 + proxy_type.encode().len()` bytes of data.
     **/
    proxyDepositFactor: bigint;

    /**
     * The maximum amount of proxies allowed for a single account.
     **/
    maxProxies: number;

    /**
     * The maximum amount of time-delayed announcements that are allowed to be pending.
     **/
    maxPending: number;

    /**
     * The base amount of currency needed to reserve for creating an announcement.
     *
     * This is held when a new storage item holding a `Balance` is created (typically 16
     * bytes).
     **/
    announcementDepositBase: bigint;

    /**
     * The amount of currency needed per announcement made.
     *
     * This is held for adding an `AccountId`, `Hash` and `BlockNumber` (typically 68 bytes)
     * into a pre-existing storage value.
     **/
    announcementDepositFactor: bigint;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Registry`'s constants
   **/
  registry: {
    /**
     * Configuration fields
     * Maximum user-configured additional fields
     **/
    maxAdditionalFields: number;

    /**
     * The amount held on deposit for a registered identity
     **/
    initialDeposit: bigint;

    /**
     * The amount held on deposit per additional field for a registered identity.
     **/
    fieldDeposit: bigint;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Commitments`'s constants
   **/
  commitments: {
    /**
     * The maximum number of additional fields that can be added to a commitment
     **/
    maxFields: number;

    /**
     * The amount held on deposit for a registered identity
     **/
    initialDeposit: bigint;

    /**
     * The amount held on deposit per additional field for a registered identity.
     **/
    fieldDeposit: bigint;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `AdminUtils`'s constants
   **/
  adminUtils: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `SafeMode`'s constants
   **/
  safeMode: {
    /**
     * For how many blocks the safe-mode will be entered by [`Pallet::enter`].
     **/
    enterDuration: number;

    /**
     * For how many blocks the safe-mode can be extended by each [`Pallet::extend`] call.
     *
     * This does not impose a hard limit as the safe-mode can be extended multiple times.
     **/
    extendDuration: number;

    /**
     * The amount that will be reserved upon calling [`Pallet::enter`].
     *
     * `None` disallows permissionlessly enabling the safe-mode and is a sane default.
     **/
    enterDepositAmount: bigint | undefined;

    /**
     * The amount that will be reserved upon calling [`Pallet::extend`].
     *
     * `None` disallows permissionlessly extending the safe-mode and is a sane default.
     **/
    extendDepositAmount: bigint | undefined;

    /**
     * The minimal duration a deposit will remain reserved after safe-mode is entered or
     * extended, unless [`Pallet::force_release_deposit`] is successfully called sooner.
     *
     * Every deposit is tied to a specific activation or extension, thus each deposit can be
     * released independently after the delay for it has passed.
     *
     * `None` disallows permissionlessly releasing the safe-mode deposits and is a sane
     * default.
     **/
    releaseDelay: number | undefined;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Ethereum`'s constants
   **/
  ethereum: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `EVM`'s constants
   **/
  evm: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `EVMChainId`'s constants
   **/
  evmChainId: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `BaseFee`'s constants
   **/
  baseFee: {
    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Drand`'s constants
   **/
  drand: {
    /**
     * A configuration for base priority of unsigned transactions.
     *
     * This is exposed so that it can be tuned for particular runtime, when
     * multiple pallets send unsigned transactions.
     **/
    unsignedPriority: bigint;

    /**
     * The maximum number of milliseconds we are willing to wait for the HTTP request to
     * complete.
     **/
    httpFetchTimeout: bigint;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
  /**
   * Pallet `Crowdloan`'s constants
   **/
  crowdloan: {
    /**
     * The pallet id that will be used to derive crowdloan account ids.
     **/
    palletId: FrameSupportPalletId;

    /**
     * The minimum deposit required to create a crowdloan.
     **/
    minimumDeposit: bigint;

    /**
     * The absolute minimum contribution required to contribute to a crowdloan.
     **/
    absoluteMinimumContribution: bigint;

    /**
     * The minimum block duration for a crowdloan.
     **/
    minimumBlockDuration: number;

    /**
     * The maximum block duration for a crowdloan.
     **/
    maximumBlockDuration: number;

    /**
     * The maximum number of contributors that can be refunded in a single refund.
     **/
    refundContributorsLimit: number;
    maxContributors: number;

    /**
     * Generic pallet constant
     **/
    [name: string]: any;
  };
}
