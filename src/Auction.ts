import {
  Field,
  SmartContract,
  state,
  State,
  method,
  CircuitValue,
  PublicKey,
  arrayProp,
  isReady,
  Poseidon,
  Mina
} from 'snarkyjs';

export { 
  Bidder,
}; 

await isReady;

// Define a CircuitValue for the secret top bidder 
class Bidder extends CircuitValue {
  // store the top bidder Public Key 
  bidder: Field;
  // add randomness to the hash 
  @arrayProp(Field, 2) value: Field[];

  constructor(addr: Field) {
    super();
    this.bidder = addr;
    // The randomness is a hack for demo right now. Should be a VDF random number 
    this.value = [this.bidder, 124463].map((value) => Field(value));
  }

  // Hash the bidder address to store it on-chain without revealing the identity 
  hash() {
    return Poseidon.hash(this.value);
  }
}

export class Auction extends SmartContract {
  // store the current best bid
  @state(Field) highestBid = State<Field>();
  // store the current bidder secret hash 
  @state(Field) bidderHash = State<Field>();
  // store the status of the current auction 
  @state(Field) accepted = State<Boolean>();
  // messages for the seller
  @state(Field) message = State<String>();
  // commitment of previous messaging history 
  @state(Field) messageCommitment = State<Field>();
  // seller of the auction 
  @state(Field) seller = State<PublicKey>();

  @method init(initialPrice: Field) {
    // set lowest price to initialize
    this.highestBid.set(initialPrice);
    // bidder as 0x0000, null address 
    this.bidderHash.set(new Bidder(Field.zero).hash()); 
    this.message.set("Welcome to MinAuction!"); 
    this.accepted.set(Boolean(false));
  }

  @method bid(price: Field) {
    // check if the bid is over 
    this.accepted.assertEquals(Boolean(false));
    // check if the new bid is valid 
    price.assertGt(this.highestBid.get()); 
    // update the highest bid
    this.highestBid.set(price); 

    // confirm the identity of the buyer
    if (!Mina.currentTransaction?.sender) {
      throw new Error('Invalid sender for the current transaction.');
    }
    const buyerPublicKey = Mina.currentTransaction.sender.toPublicKey();


    const buyer = new Bidder(buyerPublicKey as unknown as Field);
    this.bidderHash.set(buyer.hash());
  }

  @method chat(message: String) {
    if (!Mina.currentTransaction?.sender) {
      throw new Error('Invalid sender for the current transaction.');
    }
    const chatterPublicKey = Mina.currentTransaction.sender.toPublicKey();
    // check if the chatter is the one who has given the current highest bid
    const chatter = new Bidder(chatterPublicKey as unknown as Field);
    this.bidderHash.assertEquals(chatter.hash());

    // update on-chain message 
    this.message.set(message);
    // compute the latest message commitment 
    const newCommitment = Poseidon.hash([message as unknown as Field, this.messageCommitment.get()]); 
    // Update on-chain messageHistoryHash
    this.messageCommitment.set(newCommitment); 
  }

  @method accept() {
    if (!Mina.currentTransaction?.sender) {
      throw new Error('Invalid sender for the current transaction.');
    }
    const user = Mina.currentTransaction.sender.toPublicKey();
    this.seller.assertEquals(user); 

    // set the deal to be accepted 
    this.accepted.set(Boolean(true));
  }

  @method buy() {
    if (!Mina.currentTransaction?.sender) {
      throw new Error('Invalid sender for the current transaction.');
    }
    const buyerPublicKey = Mina.currentTransaction.sender.toPublicKey();
    // ensure the status as accepted purchase
    this.accepted.assertEquals(Boolean(true));

    // check if the buyer is the one who gave the highest bid
    const buyer = new Bidder(buyerPublicKey as unknown as Field);
    this.bidderHash.assertEquals(buyer.hash());

    // payment to the seller 
    Mina.sendTransaction(Mina.createTransaction(Mina.currentTransaction.sender, ()=>{return; }));
    // notify seller to deliver the product; in the future, add binding to the buyer to deliver immediately/in time
    this.message.set("The buyer " + buyerPublicKey + " has paid. You may deliver the product");
  }
}

