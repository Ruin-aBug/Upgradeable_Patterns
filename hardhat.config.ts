import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from 'dotenv';
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

const goerli_url = process.env.GOERLI_RPC_URL || "";
const bsc_test_url = process.env.BSC_TEST_RPC_URL || "";
const mumbai_url = process.env.POLYGON_TEST_RPC_URL || "";
const polygon_url = process.env.POLYGON_RPC_URL || "";
const accounts = process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];
const etherscan_key = process.env.ETHERSCAN_API_KEY || "";
const bscscan_key = process.env.BSCSCAN_API_KEY || "";
const polygonscan_key = process.env.POLYGONSCAN_API_KEY || "";
const coinmarket_api_key = process.env.COINMARKETCAP_API_KEY || "";


const config: HardhatUserConfig = {
	namedAccounts: {
		deployer: 0,
	},
	paths: {
		sources: "contracts",
	},
	typechain: {
		outDir: "types",
		target: "ethers-v5"
	},
	solidity: {
		compilers: [{
			version: "0.8.10",
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			}
		}]
	},
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 31337,
			saveDeployments: true,
			// live: true,
			forking: {
				url: polygon_url,
				blockNumber: 37131708,
				enabled: true,
			},
		},
		polygon: {
			chainId: 137,
			saveDeployments: true,
			live: true,
			url: polygon_url,
			accounts: accounts
		},
		goerli: {
			chainId: 5,
			saveDeployments: true,
			live: true,
			url: goerli_url,
			accounts: accounts
		}
	},
	etherscan: {
		apiKey: {
			goerli: etherscan_key,
		},
		customChains: [{
			network: "goerli",
			chainId: 5,
			urls: {
				apiURL: "https://api-goerli.etherscan.io/api",
				browserURL: "https://goerli.etherscan.io/"
			}
		}]
	},
	gasReporter: {
		enabled: false,
		outputFile: "gas-reporter.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: coinmarket_api_key,
		token: "ETH",
	}
};

export default config;
