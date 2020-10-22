let CrowdFundingWIthDeadLine = artifacts.require("../contracts/CrowdFundingWithDeadLine.sol")
var BigNumber = require("bignumber.js");
var chai = require("chai");
var expect = chai.expect;
var BN = require("bn.js");
var bnChai = require("bn-chai");
chai.use(bnChai(BN));


contract("CrowdFundingWithDeadLine", function(accounts) {
    let contract;
    let contractCreator = accounts[0];
    let beneficiary = accounts[1];

    const ONE_ETH = "1000000000000000000";

    const ONGOING_STATE = "0";
    const FAILED_STATE = "1";
    const SUCCEEDED_STATE = "2";
    const PAID_OUT_STATE = "3";

    beforeEach(async function() {

        contract = await CrowdFundingWIthDeadLine.new(
            "funding",
            1,
            10,
            beneficiary,
            {
                from: contractCreator,
                gas: 2000000

            }
        );  
    });

    it ("contract is initialized", async function() {
        let campaignName = await contract.name.call()
        console.log("campaignName : "+campaignName);
        expect(campaignName).to.equal("funding");
        
         let targetAmount = await contract.targetAmount.call()
        console.log("targetAmount : "+ targetAmount);
       expect(targetAmount.eq(new BN('1000000000000000000'))).to.be.true;
       expect(targetAmount.eq(new BN(ONE_ETH))).to.be.true;

        let actualBeneficiary = await contract.beneficiary.call()
        expect(actualBeneficiary).to.equal(beneficiary);

        let state = await contract.state.call()
        expect(state.valueOf()).to.eq.BN(ONGOING_STATE);
    }) 
})