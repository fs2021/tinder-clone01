import Moralis from "moralis/node";
import { ethers } from "ethers";
import { TINDER_ADDRESS, TINDER_ABI } from '../../lib/constants'

const mintMatchNft = async (req,res) => {
    await Moralis.start({
        serverUrl: process.env.MORALIS_SERVER_URL,
        appId: process.env.MORALIS_APP_ID,
        masterKey: process.env.MORALIS_MASTER_KEY,
        })
        //all that we save with nft
    const metadata = {
        name: `${req.body.names[0]} & ${req.body.names[1]}`,
        description: `${req.body.names[0].split(' ')[0]} & ${
          req.body.names[1].split(' ')[0]
        } just matched!`,
        image: `ipfs://QmY4tKpDGzVHzaSkQc5gzVMCMNoznZqaX15DXkyL2bPp8Z`,
        }
      //convert to proper format
    const toBtoa = Buffer.from(JSON.stringify(metadata)).toString('base64')
    const metadataFile = new Moralis.File('file.json', { base64: toBtoa })

    await metadataFile.saveIPFS({ useMasterKey: true })

    const metadataURI = metadataFile.ipfs()

    const provider = ethers.getDefaultProvider(process.env.ALCHEMY_API_URL, {
        chainId: 4,
        name: 'rinkeby',
        })
    //every transaction requre gas pays. 
    //in our app for we pay for all. from our wallet
    const walletWithProvider = new ethers.Wallet(
        process.env.WALLET_PRIVATE_KEY,
        provider,
        )

    const contract = new ethers.Contract(
        TINDER_ADDRESS,
        TINDER_ABI,
        walletWithProvider,
    )

    console.log(contract)

    // use function from smart-contract\contracts\TinderERC721.sol
    const tx = await contract.mintNFT(
        req.body.walletAddresses[0],
        req.body.walletAddresses[1],
        metadataURI,
    )

    console.log(tx)

    console.log(await tx)

    const txReceipt = await tx.wait()

    console.log(txReceipt)

    //window.confirm("It'a amatch! NFT created (https://testnets.opensea.io)");

    res.status(200).send({
        message: 'success',
        data: { tx: tx, txReceipt: txReceipt },
    })



}

export default mintMatchNft

