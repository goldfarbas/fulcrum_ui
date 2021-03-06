import React, { Component } from "react";
import { Asset } from "../domain/Asset";
import { WalletType } from "../domain/WalletType";
import { AssetSelectorItem } from "./AssetSelectorItem";

export interface IAssetSelectorProps {
  walletType: WalletType

  onSelectAsset?: (asset: Asset) => void;
}

export class AssetSelector extends Component<IAssetSelectorProps> {

  // true includes ENS support
  private assetsShown: Map<Asset, boolean>;

  public constructor(props: IAssetSelectorProps) {
    super(props);
    
    if (process.env.REACT_APP_ETH_NETWORK === "mainnet") {
      this.assetsShown = new Map<Asset, boolean>([
        [
          Asset.SAI,
          true
        ],
        [
          Asset.DAI,
          false
        ],
        [
          Asset.USDC,
          true
        ],
        [
          Asset.SUSD,
          false
        ],
        [
          Asset.ETH,
          false
        ],
        [
          Asset.WBTC,
          false
        ],
        [
          Asset.LINK,
          false
        ],
        [
          Asset.ZRX,
          false
        ],
        [
          Asset.KNC,
          false
        ]
      ]);
    } else if (process.env.REACT_APP_ETH_NETWORK === "kovan") {
      this.assetsShown = new Map<Asset, boolean>([
        [
          Asset.SAI,
          true
        ],
        [
          Asset.DAI,
          false
        ],
        [
          Asset.ETH,
          false
        ]
      ]);
    } else if (process.env.REACT_APP_ETH_NETWORK === "ropsten") {
      this.assetsShown = new Map<Asset, boolean>([
        [
          Asset.DAI,
          false
        ],
        [
          Asset.ETH,
          false
        ]
      ]);
    } else {
      this.assetsShown = new Map<Asset, boolean>([]);
    }
  }

  public render() {

    let assetList = Array.from(this.assetsShown.keys());
    let items;
    if (this.props.walletType === WalletType.Web3) {
      items = assetList.map(e => {
        return (
          <AssetSelectorItem key={e} asset={e} onSelectAsset={this.props.onSelectAsset} />
        );
      });
    } else {
      assetList = assetList.sort(e => this.assetsShown.get(e) ? -1 : 1);
      items = assetList.map(e => {
        return (
          <AssetSelectorItem key={e} asset={e} onSelectAsset={this.assetsShown.get(e) ? this.props.onSelectAsset : undefined} />
        );
      });
    }

    return <div className="asset-selector">{items}</div>;
  }
}
