import styles from '/const/styles'

// asset types
export const TYPE_COIN = 'coin'
export const TYPE_ERC20 = 'erc20'

// info alerts colors
export const OK = styles.infoColor.green
export const ALERT = styles.infoColor.yellow
export const ERROR = styles.infoColor.red
export const NORMAL = styles.infoColor.grey

// networks
export const MAINNET = 0
export const TESTNET = 1

// state
export const KEYS_TO_REMOVE_WHEN_EXPORTING = ['state', 'summary']

// timeouts
export const TIMEOUT_FETCH_PRICES = 30000 // 30 seconds
export const TIMEOUT_FETCH_SUMMARY = 60000 // 60 seconds
export const TIMEOUT_UPDATE_ALL_BALANCES = 60000 * 2 // 2 minutes
export const TIMEOUT_BETWEEN_EACH_GETBALANCE = 5000 // 5 seconds

// others
export const minpassword = 8
export const recovery_phrase_words = 12

// API
const API_VERSION = 1
export const API_URL = `http://localhost:3000/api/v${API_VERSION}`

// roles
export const ADMIN_ROLE = 'admin'
export const USER_ROLE = 'user'

// firebase
export const FIREBASE = {
  apiKey: 'AIzaSyCsV7sZ4BWj140Q4ImPlO_FK4HXq0a4wJY',
  authDomain: 'coinfy-521e2.firebaseapp.com',
  databaseURL: 'https://coinfy-521e2.firebaseio.com',
  storageBucket: 'coinfy-521e2.appspot.com',
}
