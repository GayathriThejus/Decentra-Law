const Moralis=require("moralis").default
const fs=require("fs")
require("dotenv").config();

const fileUploads = [
    {
        path:"target1.png",
        content: fs.readFileSync("./target1.png",{encoding:"base64"})
    },
    {
        path:"target2.png",
        content: fs.readFileSync("./target2.png",{encoding:"base64"})
    }
]

async function uploadtoIPFS(){
    await Moralis.start(
        {
            apiKey: process.env.MORALIS_KEY
        }
    )

    const res=await Moralis.EvmApi.ipfs.uploadFolder(
        {
            abi:fileUploads
        }
    )
    console.log(res.result)
}
uploadtoIPFS();
