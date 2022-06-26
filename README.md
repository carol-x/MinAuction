# Mina zkApp: MinAuction

An *anonymous* auction site to perform fair *price discovery*. Products to sell may be a venture project funding, NFT collectible, game utility NFT, physical collectible, and more. 

The core program is in [Auction.ts](src/Auction.ts). The code is not fully reviewed and is meant as work in progress and proof of concept. Frontend-backend integration is yet needed. 

## Scenario 
The bidders do not want to reveal their identity: their assets and transaction history may encourage other players (seller or other bidders) to propose prices against the bidders' best interest. For example, one may expect whales to pay price premiums, or hike price slightly above the total asset of the current best bidder. A fair price discovery auction is needed. Zero knowledge proofs powered by Mina Protocol can attest the payability of the bidders without revealing their wallet address. 

## Bidder Journey 
1. Find a project of interest from the web page. 
2. Before the bidding time elapses or an offer is accepted, the bidder can send in an anonymous `bid` together with the proof of payability (account balance greater than bidding amount). 
3. If the bidder A is the current best offer, A and only A may `message` the seller to express A's interest in buying and potential value added. 
4. Once the bidding time elapses or an offer is accepted, the best bidder can claim to `buy` with the bidding amount. 

## Seller Journey 
1. Add the project using the web client with project information, price floor and auction length. 
2. If the seller is happy with a bidding price or the bidder, the seller may `accept` the offer and conclude the auction. 
3. The seller delivers the product to the bidder. 

## TODO: Web Experience 
[UIUX Wireframe](https://www.figma.com/file/wxviF587huUbnDd6lxVcQl/Untitled?node-id=2%3A425)
1. Connect wallet once in the web. 
2. Add project screen. (Seller)
3. Place a bid screen. (Bidder)
4. Seller-bidder messaging screen. 
5. Manage project screen (with `accept` button) (Seller)


## License

[Apache-2.0](LICENSE)
