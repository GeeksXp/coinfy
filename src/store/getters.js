import { util } from 'dop'
import state from '/store/state'
import { Fiats } from '/api/Fiats'
import { Coins } from '/api/Coins'
import { localStorageGet } from '/api/browser'

function getUserProfile() {
    return JSON.parse(localStorageGet('profile'))
}

export function getAssetsFromStorage(network) {
    const user = getUserProfile()
    const assetsData = {}
    let assets = localStorageGet('assets', network)
    assets = JSON.parse(assets)
    if(user && assets) {
        Object.keys(assets).forEach(asset_id => {
            if(assets[asset_id].user.id == user.id) {
                assetsData[asset_id] = assets[asset_id]
            }
        })
        return assetsData
    } else {
        return {}
    }
}

export function getTotalAssets(assets) {
    return Object.keys(assets).length
}

export function convertBalance(symbol, value) {
    return getPrice(symbol) * (value || 0)
}

export function getAsset(asset_id) {
    return state.assets[asset_id]
}

export function isAssetRegistered(asset_id) {
    return state.assets.hasOwnProperty(asset_id)
}

export function isAssetWithPrivateKeyOrSeed(asset_id) {
    return isAssetWithPrivateKey(asset_id) || isAssetWithSeed(asset_id)
}

export function isAssetWithPrivateKey(asset_id) {
    return (
        isAssetRegistered(asset_id) &&
        state.assets[asset_id].hasOwnProperty('private_key')
    )
}

export function isAssetWithSeed(asset_id) {
    return (
        isAssetRegistered(asset_id) &&
        state.assets[asset_id].hasOwnProperty('seed')
    )
}

export function getAssetsAsArray() {
    const assets = []
    Object.keys(state.assets).forEach(asset_id => {
        assets.push(state.assets[asset_id])
    })
    return assets
}

export function generateDefaultAsset(object = {}) {
    const asset = {
        // type: type,
        // symbol: symbol,
        // address: address,
        label: '',
        balance: 0,
        printed: false, // wallet printed?
        state: {
            // this must be removed when exporting or saving in localstorage
            shall_we_fetch_summary: true,
            fetching_summary: false
        },
        summary: {
            // summary data, must be removed when exporting
        },
        user: JSON.parse(localStorageGet('profile'))
    }

    return util.merge(asset, object)
}

export function formatCurrency(value, n = 0, currencySymbol = state.fiat) {
    return Fiats[currencySymbol].format(value, n)
}

export function getNextCoinId(asset_data) {
    return getAssetId(asset_data)
    // let id = 0
    // for (let asset_id in state.assets)
    //     if (Number(asset_id) > id) id = Number(asset_id)

    // return id + 1
}

export function getAssetId({ symbol, address }) {
    return `${symbol}-${address}`
    // for (let asset_id in state.assets)
    //     if (
    //         state.assets[asset_id].symbol === symbol &&
    //         state.assets[asset_id].address === address
    //     )
    //         return asset_id
}

export function getPrice(symbol) {
    return state && state.prices && state.prices[symbol]
        ? state.prices[symbol]
        : 0
}

export function getPrivateKey(asset_id, password) {
    const { private_key } = decrypt(asset_id, password)
    return private_key
}

export function decrypt(asset_id, password) {
    const asset = getAsset(asset_id)
    const Coin = Coins[asset.symbol]

    if (isAssetWithSeed(asset_id)) {
        return Coin.decryptPrivateKeyFromSeed(
            asset.address,
            asset.seed,
            password
        )
    } else {
        const private_key = Coin.decryptPrivateKey(
            asset.address,
            asset.private_key,
            password
        )
        return { private_key }
    }

    return private_key
}

export function getLabelOrAddress(asset) {
    if (typeof asset == 'string') asset = getAsset(asset)
    return asset.label.length > 0 ? asset.label : asset.address
}

export function getReusableSeeds(symbol) {
    const reusables = []
    const groups = {}
    const assets = getAssetsAsArray().filter(asset =>
        asset.hasOwnProperty('seed')
    )

    assets.forEach(asset => {
        const hash = asset.seed.hash
        if (!groups.hasOwnProperty(hash)) groups[hash] = []
        groups[hash].push(asset)
    })

    for (let hash in groups) {
        const group = groups[hash]
        if (group.filter(asset => asset.symbol === symbol).length === 0)
            reusables.push(group)
    }

    return reusables
}
