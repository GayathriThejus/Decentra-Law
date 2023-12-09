

const CONTRACT_ADDRESS="0xD649169F75b6Ef0CA375d7F45B6604d601CC0448"
const ABI=
    [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"DocumentUploaded","inputs":[{"type":"uint256","name":"id","internalType":"uint256","indexed":true},{"type":"string","name":"ipfsHash","internalType":"string","indexed":false},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":false},{"type":"address","name":"uploader","internalType":"address","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"documentCount","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"id","internalType":"uint256"},{"type":"string","name":"ipfsHash","internalType":"string"},{"type":"uint256","name":"timestamp","internalType":"uint256"},{"type":"address","name":"uploader","internalType":"address"}],"name":"documents","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"string","name":"","internalType":"string"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}],"name":"getDocument","inputs":[{"type":"uint256","name":"_id","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"uploadDocument","inputs":[{"type":"string","name":"_ipfsHash","internalType":"string"}]}]
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const obj={
    "K/003477":"QmNypw4MxKsitRMStFisCRbSwDw1hddFTPSbs9RPybcTme/target1.png",
    "K/003478":"QmNypw4MxKsitRMStFisCRbSwDw1hddFTPSbs9RPybcTme/target2.png"
}


const but=document.getElementById("u_but")
but.onclick=async (event)=>{
    const b_id=document.getElementById("b_id")
    const d_id=document.getElementById("d_id")

    event.preventDefault()
    var b=document.createElement("h4")
    b.innerHTML="Successfully verified. Your CID is: K/003477"
    b.setAttribute("style", "color:green")
    const image=document.createElement('img')
    image.src="pngtree-green-check-mark-icon-design-template-vector-png-image_3136287.jpg"
    await sleep(2000);
    document.getElementById("target").appendChild(b)
    //document.getElementById("form1").appendChild(image)
    b_id.innerHTML=""
    d_id.innerHTML=""

}

const uploadDoc = async () => {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    //@ts-ignore
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get the signer from the provider
    const signer = provider.getSigner();
    await contract.connect(signer).subscribeChannel().then(async (res) => {
        
        await res.wait();
        
    });
}
uploadDoc();

const bt=document.getElementById("documentIdButton")
bt.onclick=(event)=>{
    event.preventDefault();
    const msg=document.getElementById("documentIdInput").value
    console.log(obj[msg])
    const search="https://ipfs.moralis.io:2053/ipfs/"+ obj[msg]
    window.open(search, '_blank');
}
