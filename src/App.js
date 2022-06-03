import { useAddress, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  // get address of user & allow them to connect with metamask
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  // add nft Drop contract
  const nftDrop = useNFTDrop("0x66463b3C1EBf08b9dE889BCc0A5cbf29dc0e2B7a");
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  // function to claim NFT
  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await nftDrop.claim(1);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  //if there isn't a wallet connected, display our connect MetaMask button
  if (!address) {
    return (
      <>
        <h1>Welcome to the Cookie Club</h1>
        <button className="btn" onClick={connectWithMetamask}>
          Connect MetaMask
        </button>
      </>
    );
  }

  // if the user is connected and has an NFT from the drop, display text
  if (hasClaimedNFT) {
    return <h2>Congratulations! You have a Cookie NFT! 🍪</h2>;
  }

  // helper function to truncate the address so it displays in a nice format
  function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  //if the user does not have an NFT, show their address and mint an NFT button
  return (
    <>
      <p className="address">
        There are no Cookie NFTs held by:{" "}
        <span className="value">{truncateAddress(address)}</span>
      </p>
      <button className="btn mint" disabled={isClaiming} onClick={mintNft}>
        Mint NFT
      </button>
    </>
  );
};

export default App;