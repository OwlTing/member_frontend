import Web3 from 'web3'

export default function useChainBalance() {
  let chainData = []
  const getBalance = async (chain, address, infura, contract) => {
    const balanceObj = {
      crypto: '',
      USDC: null
    }
    const minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256"}],
        type: "function",
      }
    ]
    const web3 = new Web3(infura)
    await web3.eth.getBalance(address)
      .then(balance => {
        const balanceEther = web3.utils.fromWei(balance, 'ether')
        balanceObj.crypto = parseFloat(balanceEther).toFixed(4)
      })
    
    try {
      const usdcContract = new web3.eth.Contract(minABI, contract)
      const result = await usdcContract.methods.balanceOf(address).call()
      if (chain === 'ethereum') {
        const resultInEther = web3.utils.fromWei(result, 'ether')
        balanceObj.USDC = Intl.NumberFormat('en-US', { currency: 'USD' }).format(parseInt(resultInEther))
      } else {
        balanceObj.USDC = Intl.NumberFormat('en-US', { currency: 'USD' }).format(parseInt(result) / 10**6)
      }
    } catch (error) {
      console.log('拿取USDC餘額出錯', error)
      balanceObj.USDC = 0
    }
    
    return chainData.push({ ...balanceObj, chain: chain[0].toUpperCase() + chain.slice(1) })
  }

  const totalBalance = async (address) => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore()
    chainData = []

    try {
      await Promise.all([
        getBalance('avalanche', address, config.public.web3.avaInfura, config.public.web3.avaUSDCContract),
        getBalance('ethereum', address, config.public.web3.ethInfura, config.public.web3.ethUSDCContract),
        getBalance('polygon', address, config.public.web3.polygonInfura, config.public.web3.polygonUSDCContract)
      ])
      .then(() => {
        authStore.setBalance(chainData)
  
        return chainData
      })

    } catch(error) {
      console.log('getTotalBalance error', error)
      return error
    }
  }

  return {
    totalBalance
  }
}