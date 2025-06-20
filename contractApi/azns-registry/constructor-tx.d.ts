// Generated by dedot cli

import type { GenericSubstrateApi } from "dedot/types";
import type { AccountId32Like } from "dedot/codecs";
import type {
  GenericConstructorTx,
  GenericConstructorTxCall,
  ConstructorTxOptions,
  GenericInstantiateSubmittableExtrinsic,
} from "dedot/contracts";

export interface ConstructorTx<ChainApi extends GenericSubstrateApi>
  extends GenericConstructorTx<ChainApi> {
  /**
   * Creates a new AZNS contract.
   *
   * @param {AccountId32Like} admin
   * @param {AccountId32Like | undefined} nameCheckerAddr
   * @param {AccountId32Like | undefined} feeCalculatorAddr
   * @param {AccountId32Like | undefined} merkleVerifierAddr
   * @param {string} tld
   * @param {string} baseUri
   * @param {ConstructorTxOptions} options
   *
   * @selector 0x9bae9d5e
   **/
  new: GenericConstructorTxCall<
    ChainApi,
    (
      admin: AccountId32Like,
      nameCheckerAddr: AccountId32Like | undefined,
      feeCalculatorAddr: AccountId32Like | undefined,
      merkleVerifierAddr: AccountId32Like | undefined,
      tld: string,
      baseUri: string,
      options: ConstructorTxOptions,
    ) => GenericInstantiateSubmittableExtrinsic<ChainApi>
  >;
}
