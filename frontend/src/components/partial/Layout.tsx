import React, {useState, useEffect, useContext, createContext} from "react";
import { ethers } from "ethers";

import GovernanceContractData from "../../contracts/Governance.json"

import Nav from "./Nav";

import "./scss/Layout.scss"

type signerContextType = {
    signer : ethers.Signer | null,
    address: string,
    setAddress: Function,
    setSigner : Function
}

type contractContextType = {
    contract: ethers.Contract | null,
    setContract: Function
}

export const providerWeb3Context = createContext<ethers.providers.Web3Provider | null>(null)
export const GovernanceContractJsonRpcContext = createContext<ethers.Contract | null>(null)
export const signerContext = createContext<signerContextType>({signer: null, address: "", setSigner: () => {}, setAddress: () => {}})
export const ERC20ContractWeb3Context = createContext<contractContextType>({contract: null, setContract: () => {}})
export const GovernanceContractWeb3Context = createContext<contractContextType>({contract: null, setContract: () => {}})

type Props = {
    children: React.ReactNode
};

function Layout({ children } : Props) { 

    const [web3Provider, setWeb3Provider] = useState<ethers.providers.Web3Provider | null>(null)

    const [GovernanceRpcContract, setRpcContract] = useState<ethers.Contract | null>(null)

    const [signer, setSigner] = useState<ethers.Signer | null>(null)
    const [address, setAddress] = useState<string>("")
    const [ERC20Contract, setERC20Contract] = useState<ethers.Contract | null>(null)
    const [GovernanceContract, setGovernanceContract] = useState<ethers.Contract | null>(null)

    useEffect(() => {
        const newWeb3Provider = new ethers.providers.Web3Provider((window as any).ethereum)
        // testnet
        // const newRPCProvider =  new ethers.providers.InfuraProvider(3, "9aa3d95b3bc440fa88ea12eaa4456161")
        // Local
        const newRPCProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")
        console.log(newRPCProvider)
        const contractGovernanceRpc = new ethers.Contract(process.env.REACT_APP_CONTRACT_GOVERNANCE_ADDRESS || "", GovernanceContractData.abi, newRPCProvider);
        setWeb3Provider(newWeb3Provider)
        setRpcContract(contractGovernanceRpc)
    }, [])


	return (
        <GovernanceContractJsonRpcContext.Provider value={GovernanceRpcContract}>
            <providerWeb3Context.Provider value={web3Provider}>
                <GovernanceContractWeb3Context.Provider value={{contract: GovernanceContract, setContract: setGovernanceContract}}>
                    <ERC20ContractWeb3Context.Provider value={{contract: ERC20Contract, setContract: setERC20Contract}}>
                        <signerContext.Provider value={{signer, address, setSigner, setAddress}}>
                            <Nav />
                            { children }
                        </signerContext.Provider>
                    </ERC20ContractWeb3Context.Provider>
                </GovernanceContractWeb3Context.Provider>
            </providerWeb3Context.Provider>
        </GovernanceContractJsonRpcContext.Provider>
	);
}

export default Layout;